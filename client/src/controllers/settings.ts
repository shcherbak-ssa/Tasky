import type { Settings } from 'models/settings';
import type { SettingsApi, SettingsController as BaseSettingsController, SettingsStorage, SettingsUpdates, Validator } from 'shared/types';
import { BaseController } from './base-controller';

export class SettingsController extends BaseController<SettingsApi, SettingsStorage, SettingsUpdates> implements BaseSettingsController {

  public static create(api: SettingsApi, storage: SettingsStorage, validator: Validator<SettingsUpdates>): SettingsController {
    return new SettingsController(api, storage, validator);
  }

  public async loadSettings(): Promise<boolean> {
    try {
      const settings: Settings = await this.api.getSettings();
      this.storage.setSettings(settings);

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

  public async saveSettings(settings: Settings): Promise<boolean> {
    try {
      if (settings.hasUpdates()) {
        const settingsUpdates: SettingsUpdates = settings.getUpdates();

        this.validator.validateToUpdate(settingsUpdates);
        await this.api.updateSettings(settingsUpdates);
        
        this.storage.setSettings(settings.getUpdatedSettings());
      }

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

}
