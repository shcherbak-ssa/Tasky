import type { Assets, AssetsApi as BaseAssetsApi } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './lib/base-api';

export class AssetsApi implements BaseAssetsApi {

  private constructor() {}

  public static create(): AssetsApi {
    return new AssetsApi();
  }

  public async loadAssets(): Promise<Assets> {
    return BaseApi.get({
      endpoint: ApiEndpoint.ASSETS,
      params: {},
      body: {},
    });
  }

}
