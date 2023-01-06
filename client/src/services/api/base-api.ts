import type { ApiRequest } from 'shared/types';
import { apiHeaders, ApiMethod, ApiEndpoint, ApiResponseCode } from 'shared/constants';

export class BaseApi {
  public static async get<P extends {}, B, R>(apiRequest: ApiRequest<P, B>): Promise<R> {
    return BaseApi.sendRequest<P, B, R>(ApiMethod.GET, apiRequest);
  }

  public static async post<P extends {}, B, R>(apiRequest: ApiRequest<P, B>): Promise<R> {
    return BaseApi.sendRequest<P, B, R>(ApiMethod.GET, apiRequest);
  }

  public static async put<P extends {}, B>(apiRequest: ApiRequest<P, B>): Promise<void> {
    return BaseApi.sendRequest<P, B>(ApiMethod.GET, apiRequest);
  }

  public static async delete<P extends {}, B>(apiRequest: ApiRequest<P, B>): Promise<void> {
    return BaseApi.sendRequest<P, B>(ApiMethod.GET, apiRequest);
  }

  private static async sendRequest<P extends {}, B, R = void>(
    method: ApiMethod,
    { endpoint, params, body }: ApiRequest<P, B>,
  ): Promise<R> {
    const endpointWithParams: string = BaseApi.setParamsToUrl(endpoint, params);
    const endpointWithParamsAndQuery: string = endpointWithParams; // @TODO: implement query

    const response = await fetch(location.origin + endpointWithParamsAndQuery, {
      method,
      headers: apiHeaders,
      body: BaseApi.isGetMethod(method) ? null : JSON.stringify(body),
    });

    if (!response.ok) {
      // @TODO: add error
      throw new Error(`${response.status} : ${response.statusText}`);
    }
    
    if (BaseApi.isNoContentCode(response.status)) {
      return {} as R;
    }

    return await response.json() as R;
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
