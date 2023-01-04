import type { ApiRequest } from 'shared/types';
import { apiHeaders, ApiMethod, ApiEndpoint } from 'shared/constants';

export class BaseApi {
  private static setParamsToUrl<Params extends object>(endpoint: ApiEndpoint, params: Params): string {
    let apiEndpoint: string = endpoint;

    for (const [key, value] of Object.entries(params)) {
      const paramRegExp = new RegExp(`:${key}`, 'g');

      apiEndpoint = apiEndpoint.replace(paramRegExp, value);
    }

    return apiEndpoint;
  }

  protected async get<P, R>(endpoint: ApiEndpoint, payload?: P): Promise<R> {
    const response = await fetch(location.origin + endpoint, {
      method: ApiMethod.GET,
      headers: apiHeaders,
      body: null,
    });

    if (response.ok) {
      return await response.json() as R;
    }

    throw new Error(`${response.status} : ${response.statusText}`);
  }

  protected async post<P, R>(endpoint: ApiEndpoint, payload: P): Promise<R> {
    const response = await fetch(location.origin + endpoint, {
      method: ApiMethod.POST,
      headers: apiHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return await response.json() as R;
    }

    throw new Error(`${response.status} : ${response.statusText}`);
  }

  protected async put<Body, Params extends object>({ endpoint, body, params }: ApiRequest<Body, Params>): Promise<void> {
    const endpointWithParams: string = BaseApi.setParamsToUrl(endpoint, params);
    
    const response = await fetch(location.origin + endpointWithParams, {
      method: ApiMethod.PUT,
      headers: apiHeaders,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return;
    }

    throw new Error(`${response.status} : ${response.statusText}`);
  }

  protected async delete<Body, Params extends object>({ endpoint, body, params }: ApiRequest<Body, Params>): Promise<void> {
    const endpointWithParams: string = BaseApi.setParamsToUrl(endpoint, params);
    
    const response = await fetch(location.origin + endpointWithParams, {
      method: ApiMethod.DELETE,
      headers: apiHeaders,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return;
    }

    throw new Error(`${response.status} : ${response.statusText}`);
  }
}
