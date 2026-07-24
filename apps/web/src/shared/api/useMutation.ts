import { useCallback, useRef, useState } from 'react';
import { ApiError, normalizeError } from './ApiError';
import { isApiError } from './types';
import type { ApiErrorData, ApiErrorResponse, ApiResponse, ApiResult } from './types';

type MutationFn<TData, TVariables extends unknown[], TError> = (
  ...args: TVariables
) => Promise<ApiResult<TData, TError>>;

/** Fired before the request runs. Awaited, so it can do async setup. */
export type OnInit<TVariables extends unknown[]> = (...args: TVariables) => void | Promise<void>;

/** Fired with the data on success. */
export type OnSuccess<TData, TVariables extends unknown[]> = (
  data: TData,
  ...args: TVariables
) => void | Promise<void>;

/**
 * Unwraps the success data a request function ultimately hands to `onSuccess`.
 * If the resolved value is an `ApiResult` envelope (what `httpClient` returns),
 * this peels it to the inner `data` — mirroring what `mutate` passes through.
 * Otherwise the resolved value itself is the data.
 *
 * `Extract` first narrows the resolved union to its `ApiResponse` arm so the
 * `ApiErrorResponse` arm can't leak the whole envelope back into the result.
 */
type SuccessDataOf<TFn extends (...args: never[]) => unknown> =
  Extract<Awaited<ReturnType<TFn>>, ApiResponse<unknown>> extends ApiResponse<infer TData>
    ? TData
    : Awaited<ReturnType<TFn>>;

/**
 * Derives the matching `OnSuccess` type from a request function. The data is the
 * value `useMutation` passes to `onSuccess` (the unwrapped `ApiResult.data` when
 * the fn returns an envelope) and the variables are the function's parameters.
 *
 * @example
 * type LessonsOnSuccess = OnSuccessOf<typeof getLessonsReq>;
 */
export type OnSuccessOf<TFn extends (...args: never[]) => unknown> = OnSuccess<
  SuccessDataOf<TFn>,
  Parameters<TFn>
>;

/** Fired with the normalized error on failure. */
export type OnError<TVariables extends unknown[], TError> = (
  error: ApiErrorData<TError>,
  ...args: TVariables
) => void | Promise<void>;

/**
 * Unwraps the raw error payload (`TError`) a request function carries. If the
 * resolved value is an `ApiResult` envelope, this digs into the `ApiErrorResponse`
 * arm and pulls the `response` type out of its `ApiErrorData<TError>`. Otherwise
 * the payload is unknown.
 *
 * `Extract` first narrows the resolved union to its `ApiErrorResponse` arm so the
 * `ApiResponse` (success) arm can't interfere.
 */
type ErrorPayloadOf<TFn extends (...args: never[]) => unknown> =
  Extract<Awaited<ReturnType<TFn>>, ApiErrorResponse<unknown>> extends ApiErrorResponse<
    infer TError
  >
    ? TError
    : unknown;

/**
 * Derives the matching `OnError` type from a request function. The error is the
 * normalized `ApiErrorData` `useMutation` passes to `onError` (carrying the raw
 * payload from the fn's `ApiResult`) and the variables are the fn's parameters.
 *
 * @example
 * type LessonsOnError = OnErrorOf<typeof getLessonsReq>;
 */
export type OnErrorOf<TFn extends (...args: never[]) => unknown> = OnError<
  Parameters<TFn>,
  ErrorPayloadOf<TFn>
>;

/** Fired after success or failure, always. */
export type OnFinally<TVariables extends unknown[]> = (...args: TVariables) => void | Promise<void>;

export type UseMutationOptions<TData, TVariables extends unknown[], TError> = {
  /** The request to run. Usually a thin wrapper around an httpClient call. */
  mutationFn: MutationFn<TData, TVariables, TError>;
  onInit?: OnInit<TVariables>;
  onSuccess?: OnSuccess<TData, TVariables>;
  onError?: OnError<TVariables, TError>;
  onFinally?: OnFinally<TVariables>;
};

/**
 * Derives the full `useMutation` options object from a request function, with all
 * type params (data, variables, error) inferred from the fn's signature. `Pick`
 * whichever callbacks a hook wants to expose.
 *
 * @example
 * type UseLevelsListProps = Pick<MutationOptionsOf<typeof getLevelsReq>, 'onSuccess' | 'onError'>;
 */
export type MutationOptionsOf<TFn extends (...args: never[]) => unknown> = UseMutationOptions<
  SuccessDataOf<TFn>,
  Parameters<TFn>,
  ErrorPayloadOf<TFn>
>;

/**
 * Discriminated result of `mutate`. Branch on `ok` — never on the truthiness of
 * the data, since a successful request can legitimately resolve to `undefined`
 * (e.g. a 204 delete) and would be indistinguishable from a failure otherwise.
 */
export type MutateResult<TData, TError> =
  | { ok: true; data: TData }
  | { ok: false; error: ApiErrorData<TError> };

export type UseMutationResult<TData, TVariables extends unknown[], TError> = {
  /** Run the request. Resolves to `{ ok: true, data }` or `{ ok: false, error }`. */
  mutate: (...args: TVariables) => Promise<MutateResult<TData, TError>>;
  isLoading: boolean;
  error: ApiErrorData<TError> | null;
  reset: () => void;
};

/**
 * The single hook for firing API requests from a component. It tracks loading
 * and error state for you and surfaces errors as a normalized object instead of
 * throwing.
 *
 * @example
 * const { mutate, isLoading, error } = useMutation({
 *   mutationFn: (input: CreateCourseInput) =>
 *     httpClient.post<Course>('/courses', input),
 *   onSuccess: (course) => navigate(`/courses/${course.id}`),
 * });
 *
 * <Button disabled={isLoading} onClick={() => mutate(formValues)}>Save</Button>
 * {error && <Alert severity="error">{error.message}</Alert>}
 */
export const useMutation = <TData, TVariables extends unknown[] = [], TError = unknown>(
  options: UseMutationOptions<TData, TVariables, TError>,
): UseMutationResult<TData, TVariables, TError> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorData<TError> | null>(null);

  // Keep the latest options in a ref so `mutate` stays referentially stable
  // across renders while always calling the most recent callbacks.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  const mutate = useCallback(async (...args: TVariables): Promise<MutateResult<TData, TError>> => {
    const { mutationFn, onInit, onSuccess, onError, onFinally } = optionsRef.current;

    setError(null);
    setIsLoading(true);
    await onInit?.(...args);

    try {
      const result = await mutationFn(...args);
      if (isApiError(result)) throw new ApiError(result.error);
      await onSuccess?.(result.data, ...args);
      return { ok: true, data: result.data };
    } catch (err) {
      const normalized = normalizeError<TError>(err);
      setError(normalized);
      await onError?.(normalized, ...args);
      return { ok: false, error: normalized };
    } finally {
      setIsLoading(false);
      await onFinally?.(...args);
    }
  }, []);

  return { mutate, isLoading, error, reset };
};
