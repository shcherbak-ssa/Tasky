import type {
  AppApi,
  AppController as BaseAppController,
  AppNotification,
  AppStorage,
  AssetsController,
  SettingsController,
  Validator,
} from 'shared/types';
import { Controller, CssClass, NotificationGroup, NOTIFICATION_LIFE, Popup } from 'shared/constants';
import { BaseController } from './base-controller';

const POPUP_ELEMENT_ID: string = 'popup';

export class AppController extends BaseController<AppApi, AppStorage, {}> implements BaseAppController {

  private popupElement: HTMLElement | null = document.getElementById('popup');

  public static create(api: AppApi, storage: AppStorage, validator: Validator<{}>): AppController {
    const appController: AppController = new AppController(api, storage, validator);

    if (appController.popupElement) {
      appController.popupElement.addEventListener('click', (e: Event) => {
        if ((e.target as HTMLElement).id === POPUP_ELEMENT_ID) {
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
      this.storage.setPopup(popup);
      this.popupElement.classList.remove(CssClass.HIDDEN);
    }
  }

  public closePopup(): void {
    if (this.popupElement) {
      this.storage.removePopup();
      this.popupElement.classList.add(CssClass.HIDDEN);
    }
  }

  public showNotification(notification: AppNotification): void {
    if (notification.group !== NotificationGroup.PROCESS) {
      notification.life = NOTIFICATION_LIFE;
      notification.group = NotificationGroup.MESSAGE;
    }

    this.storage.setNotification(notification);
  }

  public async removeNotification(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.storage.removeNotification();
        resolve();
      });
    });
  }

}
