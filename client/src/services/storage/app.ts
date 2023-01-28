import type { AppNotification, AppStorage as BaseAppStorage } from 'shared/types';
import { Popup, StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class AppStorage extends BaseStorage implements BaseAppStorage {

  public static create(): AppStorage {
    return new AppStorage();
  }

  public setPopup(popup: Popup): void {
    this.storage.commit(StoreMutation.SET_POPUP, popup);
  }

  public removePopup(): void {
    this.storage.commit(StoreMutation.SET_POPUP, null);
  }

  public setNotification(notification: AppNotification): void {
    this.storage.commit(StoreMutation.SET_NOTIFICATION, notification);
  }

  public removeNotification(): void {
    this.storage.commit(StoreMutation.SET_NOTIFICATION, null);
  }

}
