import { StoreMutation } from 'shared/constants';
import { Assets, AssetsStorage as BaseAssetsStorage } from 'shared/types';
import { BaseStorage } from './base-storage';

export class AssetsStorage extends BaseStorage implements BaseAssetsStorage {
  public addAssets(assets: Assets): void {
    this.storage.commit(StoreMutation.ADD_ASSETS, assets);
  }
}
