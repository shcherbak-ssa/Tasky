import type { NotificationGroup, NotificationType, Popup } from 'shared/constants';
import type { Settings } from 'models/settings';

export type AppState = {
  popup: Popup | null;
  notification: AppNotification | null;
  settings: Settings | null;
}

export type AppNotification = {
  type: NotificationType;
  heading: string;
  message: string;
  group?: NotificationGroup;
  life?: number;
  undo?: () => void;
}

export interface AppController {
  setup(): Promise<boolean>;
  openPopup(popup: Popup): void;
  closePopup(): void;
  showNotification(notification: AppNotification): void;
  removeNotification(): Promise<void>;
}

export interface AppApi {}

export interface AppStorage {
  setPopup(popup: Popup): void;
  removePopup(): void;
  setNotification(notification: AppNotification): void;
  removeNotification(): void;
}
