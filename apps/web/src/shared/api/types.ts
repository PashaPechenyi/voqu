/**
 * Shape every API error is normalized to before it reaches a component.
 * `response` holds the raw error body the server sent (if any), so callers
 * that need field-level details can still reach them.
 */
export type ApiErrorData<TResponse = unknown> = {
  message: string;
  code: number | null;
  description: string | null;
  response: TResponse | null;
};

/** Successful response envelope returned by the http client. */
export type ApiResponse<TData> = {
  data: TData;
  status: number;
};

/** Error envelope returned by the http client (never throws on HTTP errors). */
export type ApiErrorResponse<TResponse = unknown> = {
  error: ApiErrorData<TResponse>;
};

/** Either a success or an error — the union the http client always resolves to. */
export type ApiResult<TData, TError = unknown> = ApiResponse<TData> | ApiErrorResponse<TError>;

/** Type guard: did the request fail? */
export const isApiError = <TData, TError>(
  result: ApiResult<TData, TError>,
): result is ApiErrorResponse<TError> => 'error' in result;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Body types the client knows how to serialize. */
export type RequestBody = object | FormData | string | undefined;

/** Per-request options, a thin subset of fetch's RequestInit. */
export type RequestOptions = Omit<RequestInit, 'method' | 'body'>;
