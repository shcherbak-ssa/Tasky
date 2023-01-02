import { Assets, AssetsApi, AssetsController as BaseAssetsController, AssetsStorage } from 'shared/types';
import { BaseController } from './base-controller';

export class AssetsController extends BaseController<AssetsApi, AssetsStorage> implements BaseAssetsController {
  public async loadAssets(): Promise<boolean> {
    try {
      const assets: Assets = await this.api.loadAssets();
      this.storage.addAssets(assets);
      console.log(assets);

      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }
}
