import type { Assets, ProjectUpdates, ErrorObject, Settings } from 'shared/types';
import type { Popup } from 'shared/constants';

export type AppState = {
  activePopup: Popup | null;
  assets: Assets;
  settings: Settings | null;
}

export interface AppController {
  setup(): Promise<boolean>;
  openPopup(popup: Popup): void;
  closePopup(): void;
}

export interface AppApi {}

export interface AppStorage {
  setActivePopup(popup: Popup | null): void;
}
