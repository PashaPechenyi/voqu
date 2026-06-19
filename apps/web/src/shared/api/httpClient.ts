import type {
  ApiErrorResponse,
  ApiResponse,
  HttpMethod,
  RequestBody,
  RequestOptions,
} from './types';

const DEFAULT_ERROR_MESSAGE = 'Network request failed. Please try again.';

/**
 * Auth0's token lives inside React (`getAccessTokenSilently`), but the http
 * client is a plain singleton. So the app injects a token getter once at
 * startup (see registerTokenGetter / useRegisterAuthToken) and the client calls
 * it before every request.
 */
type TokenGetter = () => Promise<string | null>;

export class HttpClient {
  /**
   * Base path prefixed onto every request. The API serves all routes under
   * `/api` (NestJS global prefix), so we always append it. With VITE_API_URL
   * unset, requests go to `/api/...` and Vite's dev proxy forwards them to the
   * API server (see vite.config.ts). With VITE_API_URL set to the API origin,
   * requests go straight to `<origin>/api/...`.
   */
  private readonly baseUrl: string;

  private getToken: TokenGetter = async () => null;

  constructor(origin = import.meta.env.VITE_API_URL ?? '') {
    this.baseUrl = `${origin.replace(/\/$/, '')}/api`;
  }

  registerTokenGetter(getter: TokenGetter): void {
    this.getToken = getter;
  }

  get<TData, TError = unknown>(url: string, options: RequestOptions = {}) {
    return this.request<TData, TError>('GET', url, undefined, options);
  }

  post<TData, TError = unknown>(url: string, body?: RequestBody, options: RequestOptions = {}) {
    return this.request<TData, TError>('POST', url, body, options);
  }

  put<TData, TError = unknown>(url: string, body?: RequestBody, options: RequestOptions = {}) {
    return this.request<TData, TError>('PUT', url, body, options);
  }

  patch<TData, TError = unknown>(url: string, body?: RequestBody, options: RequestOptions = {}) {
    return this.request<TData, TError>('PATCH', url, body, options);
  }

  delete<TData, TError = unknown>(url: string, options: RequestOptions = {}) {
    return this.request<TData, TError>('DELETE', url, undefined, options);
  }

  /** Serialize the body and return the matching content-type (if any). */
  private prepareBody(body: RequestBody): [BodyInit | undefined, string | undefined] {
    if (body === undefined) return [undefined, undefined];
    if (body instanceof FormData) return [body, undefined]; // browser sets boundary
    if (typeof body === 'string') return [body, 'text/plain'];
    return [JSON.stringify(body), 'application/json'];
  }

  private async parseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return response.json().catch(() => null);
    }
    if (response.status === 204) return null;
    return response.text().catch(() => null);
  }

  private async request<TData, TError = unknown>(
    method: HttpMethod,
    url: string,
    body: RequestBody,
    options: RequestOptions,
  ): Promise<ApiResponse<TData> | ApiErrorResponse<TError>> {
    const [preparedBody, contentType] = this.prepareBody(body);

    const headers = new Headers(options.headers);
    if (contentType) headers.set('Content-Type', contentType);

    const token = await this.getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        method,
        headers,
        body: preparedBody,
      });

      const payload = await this.parseBody(response);

      if (!response.ok) {
        const errorBody = (payload ?? {}) as Record<string, unknown>;
        return {
          error: {
            message:
              (typeof errorBody.message === 'string' && errorBody.message) ||
              response.statusText ||
              DEFAULT_ERROR_MESSAGE,
            code: response.status,
            description: typeof errorBody.description === 'string' ? errorBody.description : null,
            response: payload as TError,
          },
        };
      }

      return { data: payload as TData, status: response.status };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
          code: null,
          description: null,
          response: null,
        },
      };
    }
  }
}

/**
 * The single http client used across the app. Every method resolves to either
 * `{ data, status }` or `{ error }` — it never throws on an HTTP error, so
 * callers can branch on the result (useMutation does this for you).
 */
export const httpClient = new HttpClient();

/** Inject the auth-token getter onto the shared client instance. */
export const registerTokenGetter = (getter: TokenGetter): void =>
  httpClient.registerTokenGetter(getter);
