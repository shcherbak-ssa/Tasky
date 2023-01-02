import { Assets, AssetsApi as BaseAssetsApi } from 'shared/types';
import { ApiUrl } from 'shared/constants';
import { BaseApi } from './base-api';

export class AssetsApi extends BaseApi implements BaseAssetsApi {
  public async loadAssets(): Promise<Assets> {
    return this.get(ApiUrl.ASSETS);
  }
}
