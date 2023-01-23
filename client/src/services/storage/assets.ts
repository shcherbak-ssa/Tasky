import type { Assets, AssetsStorage as BaseAssetsStorage } from 'shared/types';
import { StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class AssetsStorage extends BaseStorage implements BaseAssetsStorage {

  public static create(): AssetsStorage {
    return new AssetsStorage();
  }

  public addAssets(assets: Assets): void {
    this.storage.commit(StoreMutation.ADD_ASSETS, assets);
  }

  public getAssets<K extends keyof Assets>(key: K): Assets[K] {
    return this.storage.state.app.assets[key];
  }

}
