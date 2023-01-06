import type { Assets, AssetsApi, AssetsController as BaseAssetsController, AssetsStorage, Validator } from 'shared/types';
import { BaseController } from './base-controller';

export class AssetsController extends BaseController<AssetsApi, AssetsStorage, {}> implements BaseAssetsController {

  public static create(api: AssetsApi, storage: AssetsStorage, validator: Validator<{}>): AssetsController {
    return new AssetsController(api, storage, validator);
  }

  public async loadAssets(): Promise<boolean> {
    try {
      const assets: Assets = await this.api.loadAssets();
      this.storage.addAssets(assets);

      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }

  public getAssets<K extends keyof Assets>(key: K): Assets[K] {
    return this.storage.getAssets(key);
  }

}
