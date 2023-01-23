import type { SettingsApi as BaseSettingsApi, SettingsSchema, SettingsUpdates } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { Settings } from 'models/settings';
import { BaseApi } from './base-api';

export class SettingsApi implements BaseSettingsApi {

  private constructor() {}

  public static create(): SettingsApi {
    return new SettingsApi();
  }

  public async getSettings(): Promise<Settings> {
    const settingsSchema: SettingsSchema = await BaseApi.get({
      endpoint: ApiEndpoint.SETTINGS,
    });

    return Settings.create(settingsSchema);
  }

  public async updateSettings(updates: SettingsUpdates): Promise<void> {
    await BaseApi.put({
      endpoint: ApiEndpoint.SETTINGS,
      body: updates,
    });
  }

}
