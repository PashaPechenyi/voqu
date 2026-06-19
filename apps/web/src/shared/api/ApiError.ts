import type { ApiErrorData } from './types';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Error thrown internally when an API call fails. Components don't catch this
 * directly — `useMutation` catches it and exposes a normalized `error` object.
 */
export class ApiError<TResponse = unknown> extends Error {
  readonly code: number | null;
  readonly description: string | null;
  readonly response: TResponse | null;

  constructor(data: ApiErrorData<TResponse>) {
    super(data.message || DEFAULT_ERROR_MESSAGE);
    this.name = 'ApiError';
    this.code = data.code;
    this.description = data.description;
    this.response = data.response;
  }
}

/**
 * Coerce any thrown value (ApiError, network Error, anything) into the single
 * normalized error shape components consume.
 */
export const normalizeError = <TResponse = unknown>(error: unknown): ApiErrorData<TResponse> => {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      code: error.code,
      description: error.description,
      response: error.response as TResponse | null,
    };
  }

  return {
    message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
    code: null,
    description: null,
    response: null,
  };
};
