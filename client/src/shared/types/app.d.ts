import type { ProjectUpdates, ErrorObject } from 'shared/types';
import type { Popup } from 'shared/constants';

export type AppState = {
  activePopup: Popup | null;
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
