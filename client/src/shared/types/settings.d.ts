import type { ProjectsView } from 'shared/constants';
import type { Settings } from 'models/settings';

export type SettingsState = Settings | null;

export type SettingsSchema = {
  id: number;
  projectsView: ProjectsView;
  updatedAt: Date | null;
}

export type SettingsUpdates = Partial<
  Omit<SettingsSchema, 'id'>
> & {
  id: number;
}

export interface SettingsController {
  loadSettings(): Promise<boolean>;
  saveSettings(settings: Settings): Promise<boolean>;
}

export interface SettingsApi {
  getSettings(): Promise<Settings>;
  updateSettings(updates: SettingsUpdates): Promise<void>;
}

export interface SettingsStorage {
  setSettings(settings: Settings): void;
}
