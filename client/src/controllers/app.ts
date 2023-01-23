import type {
  AppApi,
  AppController as BaseAppController,
  AppStorage,
  AssetsController,
  SettingsController,
  Validator,
} from 'shared/types';
import { Controller, Popup } from 'shared/constants';
import { BaseController } from './base-controller';

export class AppController extends BaseController<AppApi, AppStorage, {}> implements BaseAppController {

  private popupElement: HTMLElement | null = document.getElementById('popup');

  public static create(api: AppApi, storage: AppStorage, validator: Validator<{}>): AppController {
    const appController: AppController = new AppController(api, storage, validator);

    if (appController.popupElement) {
      appController.popupElement.addEventListener('click', (e: Event) => {
        if ((e.target as HTMLElement).id === 'popup') {
          appController.closePopup();
        }
      });
    }

    return appController;
  }

  public async setup(): Promise<boolean> {
    try {
      const assetsController: AssetsController = BaseController.controllers[Controller.ASSETS];
      const settingsController: SettingsController = BaseController.controllers[Controller.SETTINGS];

      await Promise.all([
        assetsController.loadAssets(),
        settingsController.loadSettings(),
      ]);

      return true;
    } catch (e) {
      return false;
    }
  }

  public openPopup(popup: Popup): void {
    if (this.popupElement) {
      this.storage.setActivePopup(popup);
      this.popupElement.classList.remove('hidden');
    }
  }

  public closePopup(): void {
    if (this.popupElement) {
      this.storage.setActivePopup(null);
      this.popupElement.classList.add('hidden');
    }
  }

}
