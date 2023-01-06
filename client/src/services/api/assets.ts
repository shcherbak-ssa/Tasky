import type { Assets, AssetsApi as BaseAssetsApi } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './base-api';

export class AssetsApi implements BaseAssetsApi {
  public async loadAssets(): Promise<Assets> {
    return BaseApi.get({
      endpoint: ApiEndpoint.ASSETS,
      params: {},
      body: {},
    });
  }
}
