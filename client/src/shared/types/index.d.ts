import type { ApiEndpoint, Controller } from 'shared/constants';
import type { AppController, AppState } from './app';
import type { AssetsController } from './assets';
import type { ProjectsController, ProjectsState } from './projects';
import type { SettingsController } from './settings';

export * from './app';
export * from './assets';
export * from './projects';
export * from './settings';

export type ErrorObject<T> = {
  [key in keyof T]?: string;
}

export type ApiErrorResponse<T> = {
  message: string;
  errors: ErrorObject<T>;
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
  validateToCreate(object: T): T;
  validateToUpdate(object: T): T;
}

export type ControllerList = {
  [Controller.APP]: AppController;
  [Controller.ASSETS]: AssetsController;
  [Controller.PROJECTS]: ProjectsController;
  [Controller.SETTINGS]: SettingsController;
}
