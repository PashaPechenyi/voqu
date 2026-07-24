import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, normalizeError } from './ApiError';
import { isApiError } from './types';
import type { ApiErrorData, ApiResult } from './types';

type QueryFn<TData, TError> = () => Promise<ApiResult<TData, TError>>;

/**
 * `TData` is the shape the backend returns; `TMutatedData` is what the hook
 * exposes. They're the same unless `mutateData` reshapes the response (e.g.
 * unwrapping a `{ items }` envelope into the array).
 */
export type UseQueryOptions<TData, TError, TMutatedData = TData> = {
  /**
   * A value that identifies this query. The request re-runs whenever the key
   * changes. Use a primitive or an array of primitives (e.g. `['course', id]`).
   */
  queryKey: unknown;
  /** The request to run. Usually a thin wrapper around an httpClient call. */
  queryFn: QueryFn<TData, TError>;
  /**
   * Value `data` holds before the first successful fetch (instead of `null`).
   * Handy for list queries so consumers can skip a `?? []` fallback.
   */
  defaultValue?: TMutatedData;
  /**
   * When `false`, the query does not run automatically. Flip it to `true` once
   * its dependencies are ready (e.g. an id has loaded). Defaults to `true`.
   */
  enabled?: boolean;
  /** Fired before the request runs (after `isLoading` is true). Awaited, so it can do async setup. */
  onInit?: () => void | Promise<void>;
  /**
   * Transform the raw backend data before it is stored in state. The returned
   * value becomes `data`, and is what `onSuccess` and `refetch` receive too.
   */
  mutateData?: (data: TData) => TMutatedData;
  /** Fired with the (possibly transformed) data on success. */
  onSuccess?: (data: TMutatedData) => void | Promise<void>;
  /** Fired with the normalized error on failure. */
  onError?: (error: ApiErrorData<TError>) => void | Promise<void>;
  /** Fired after success or failure, always. */
  onFinally?: () => void | Promise<void>;
};

/**
 * Discriminated result of `refetch`. Branch on `ok` — never on the truthiness of
 * the data, since a successful request can legitimately resolve to `undefined`
 * and would be indistinguishable from a failure otherwise.
 */
export type QueryResult<TMutatedData, TError> =
  | { ok: true; data: TMutatedData }
  | { ok: false; error: ApiErrorData<TError> };

export type UseQueryResult<TMutatedData, TError, TDataState = TMutatedData | null> = {
  /**
   * The fetched (and optionally transformed) data. `null` until the first
   * successful fetch, unless a `defaultValue` was provided.
   */
  data: TDataState;
  isLoading: boolean;
  error: ApiErrorData<TError> | null;
  /** Run the request again. Resolves to `{ ok: true, data }` or `{ ok: false, error }`. */
  refetch: () => Promise<QueryResult<TMutatedData, TError>>;
  /** Clear data, loading, and error state. */
  reset: () => void;
};

/**
 * The read-on-mount companion to `useMutation`. It runs `queryFn` automatically
 * on mount and again whenever `queryKey` changes, tracks `data` / `isLoading` /
 * `error`, and surfaces errors as a normalized object instead of throwing.
 *
 * @example
 * const { data: course, isLoading, error } = useQuery({
 *   queryKey: ['course', courseId],
 *   queryFn: () => httpClient.get<Course>(`/course/${courseId}`),
 *   enabled: Boolean(courseId),
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Alert severity="error">{error.message}</Alert>;
 * return <CourseDetails course={course} />;
 */
// With a `defaultValue`, `data` is never null.
export function useQuery<TData, TError = unknown, TMutatedData = TData>(
  options: UseQueryOptions<TData, TError, TMutatedData> & { defaultValue: TMutatedData },
): UseQueryResult<TMutatedData, TError, TMutatedData>;
// Without one, `data` starts as null.
export function useQuery<TData, TError = unknown, TMutatedData = TData>(
  options: UseQueryOptions<TData, TError, TMutatedData>,
): UseQueryResult<TMutatedData, TError, TMutatedData | null>;
export function useQuery<TData, TError = unknown, TMutatedData = TData>(
  options: UseQueryOptions<TData, TError, TMutatedData>,
): UseQueryResult<TMutatedData, TError> {
  const { queryKey, enabled = true, defaultValue = null } = options;

  const [data, setData] = useState<TMutatedData | null>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorData<TError> | null>(null);

  // Keep the latest options in a ref so `refetch` stays referentially stable
  // across renders while always calling the most recent callbacks.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const reset = useCallback(() => {
    setData(optionsRef.current.defaultValue ?? null);
    setError(null);
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async (): Promise<QueryResult<TMutatedData, TError>> => {
    const { queryFn, onInit, mutateData, onSuccess, onError, onFinally } = optionsRef.current;

    setError(null);
    setIsLoading(true);
    await onInit?.();

    try {
      const result = await queryFn();
      if (isApiError(result)) throw new ApiError(result.error);
      // When `mutateData` is omitted, `TMutatedData` defaults to `TData`, so the
      // raw response is already the exposed shape.
      const nextData = mutateData
        ? mutateData(result.data)
        : (result.data as unknown as TMutatedData);
      setData(nextData);
      await onSuccess?.(nextData);
      return { ok: true, data: nextData };
    } catch (err) {
      const normalized = normalizeError<TError>(err);
      setError(normalized);
      await onError?.(normalized);
      return { ok: false, error: normalized };
    } finally {
      setIsLoading(false);
      await onFinally?.();
    }
  }, []);

  // Run on mount and whenever the key changes (or the query becomes enabled).
  // `refetch` is stable, so it isn't a meaningful dependency.
  useEffect(() => {
    if (!enabled) return;
    void fetchData();
  }, [enabled, JSON.stringify(queryKey), fetchData]);

  return { data, isLoading, error, refetch: fetchData, reset };
}
