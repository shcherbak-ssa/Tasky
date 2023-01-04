import type { Assets, AssetsApi as BaseAssetsApi } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './base-api';

export class AssetsApi extends BaseApi implements BaseAssetsApi {
  public async loadAssets(): Promise<Assets> {
    return this.get(ApiEndpoint.ASSETS);
  }
}
