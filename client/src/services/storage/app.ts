import type { AppStorage as BaseAppStorage } from 'shared/types';
import { Popup, StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class AppStorage extends BaseStorage implements BaseAppStorage {

  public static create(): AppStorage {
    return new AppStorage();
  }

  public setActivePopup(popup: Popup | null): void {
    this.storage.commit(StoreMutation.SET_ACTIVE_POPUP, popup);
  }

}
