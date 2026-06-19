import { useCallback, useRef, useState } from 'react';
import { ApiError, normalizeError } from './ApiError';
import { isApiError } from './types';
import type { ApiErrorData, ApiResult } from './types';

type MutationFn<TData, TVariables extends unknown[], TError> = (
  ...args: TVariables
) => Promise<ApiResult<TData, TError>>;

export type UseMutationOptions<TData, TVariables extends unknown[], TError> = {
  /** The request to run. Usually a thin wrapper around an httpClient call. */
  mutationFn: MutationFn<TData, TVariables, TError>;
  /** Fired before the request runs. Awaited, so it can do async setup. */
  onInit?: (...args: TVariables) => void | Promise<void>;
  /** Fired with the data on success. */
  onSuccess?: (data: TData, ...args: TVariables) => void | Promise<void>;
  /** Fired with the normalized error on failure. */
  onError?: (error: ApiErrorData<TError>, ...args: TVariables) => void | Promise<void>;
  /** Fired after success or failure, always. */
  onFinally?: (...args: TVariables) => void | Promise<void>;
};

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
