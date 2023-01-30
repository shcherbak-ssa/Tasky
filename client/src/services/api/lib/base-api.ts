import type { ApiErrorResponse, ApiRequest } from 'shared/types';
import { apiHeaders, ApiMethod, ApiEndpoint, ApiResponseCode, QUERY_URL_SEPARATOR } from 'shared/constants';
import { ApiError, ValidationError } from 'shared/errors';

export class BaseApi {

  public static async get<P extends {}, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R> {
    return BaseApi.sendRequest<P, Q, B, R>(ApiMethod.GET, apiRequest);
  }

  public static async post<P extends {}, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R> {
    return BaseApi.sendRequest<P, Q, B, R>(ApiMethod.POST, apiRequest);
  }

  public static async put<P extends {}, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void> {
    return BaseApi.sendRequest<P, Q, B>(ApiMethod.PUT, apiRequest);
  }

  public static async delete<P extends {}, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void> {
    return BaseApi.sendRequest<P, Q, B>(ApiMethod.DELETE, apiRequest);
  }

  private static async sendRequest<P extends {}, Q, B, R = void>(
    method: ApiMethod,
    { endpoint, params, query, body }: ApiRequest<P, Q, B>,
  ): Promise<R> {
    let apiEndpoint: string = BaseApi.setParamsToUrl(endpoint, params || {});

    if (query) {
      // @ts-ignore
      const queryString: string = new URLSearchParams(query).toString();
      apiEndpoint += QUERY_URL_SEPARATOR + queryString;
    }

    const response = await fetch(location.origin + apiEndpoint, {
      method,
      headers: apiHeaders,
      body: BaseApi.isGetMethod(method) ? null : JSON.stringify(body || {}),
    });

    if (response.ok) {
      if (BaseApi.isNoContentCode(response.status)) {
        return {} as R;
      }

      return await response.json() as R;
    }

    const { errors, message } = await response.json() as ApiErrorResponse<B>;

    if (response.status === ApiResponseCode.BAD_REQUEST) {
      throw new ValidationError(errors);
    }

    throw new ApiError(response.status.toString(), message);
  }

  private static setParamsToUrl<P extends object>(endpoint: ApiEndpoint, params: P): string {
    let apiEndpoint: string = endpoint;

    for (const [key, value] of Object.entries(params)) {
      const paramRegExp = new RegExp(`:${key}`, 'g');

      apiEndpoint = apiEndpoint.replace(paramRegExp, value);
    }

    return apiEndpoint;
  }

  private static isGetMethod(method: ApiMethod): boolean {
    return method === ApiMethod.GET;
  }

  private static isNoContentCode(code: number): boolean {
    return code === ApiResponseCode.NO_CONTENT;
  }

}
