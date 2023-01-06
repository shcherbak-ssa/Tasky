import type { SettingsStorage as BaseSettingsStorage } from 'shared/types';
import type { Settings } from 'models/settings';
import { StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class SettingsStorage extends BaseStorage implements BaseSettingsStorage {

  public static create(): SettingsStorage {
    return new SettingsStorage();
  }
  
  public setSettings(settings: Settings): void {
    this.storage.commit(StoreMutation.SET_SETTINGS, settings);
  }

}
