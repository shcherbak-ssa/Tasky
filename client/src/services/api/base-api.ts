import { apiHeaders, ApiMethod, ApiUrl } from 'shared/constants';

export class BaseApi {
  protected async get<Payload, Result>(url: ApiUrl, payload: Payload): Promise<Result> {
    const response = await fetch(location.origin + url, {
      method: ApiMethod.GET,
      headers: apiHeaders,
      body: null,
    });

    if (response.ok) {
      return await response.json() as Result;
    }

    throw new Error(response.statusText);
  }
}
