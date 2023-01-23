import type { Project } from 'models/project';
import type { ApiEndpoint, Controller } from 'shared/constants';
import type { AppController, AppState } from './app';
import type { Assets, AssetsController } from './assets';
import type { ProjectsController, ProjectsState } from './projects';
import type { SettingsController, SettingsState } from './settings';

export * from './app';
export * from './assets';
export * from './projects';
export * from './settings';

export type ErrorObject<T> = {
  key: keyof T;
  message: string;
}

export type ApiRequest<P, Q, B> = {
  endpoint: ApiEndpoint;
  params?: P;
  query?: Q;
  body?: B;
}

export type StoreState = {
  app: AppState;
  projects: ProjectsState;
}

export interface Validator<T> {
  validateToCreate(object: T): void;
  validateToUpdate(object: T): void;
}

export type ControllerList = {
  [Controller.APP]: AppController;
  [Controller.ASSETS]: AssetsController;
  [Controller.PROJECTS]: ProjectsController;
  [Controller.SETTINGS]: SettingsController;
}
