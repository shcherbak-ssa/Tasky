import type { StoreState } from 'shared/types';

export * from './settings';
export * from './projects';

export const ZERO: number = 0;
export const EMPTY_STRING: string = '';
export const QUERY_URL_SEPARATOR: string = '?';

export enum ErrorName {
  VALIDATION_ERROR = 'ValidationError',
}

// Controllers
export enum Controller {
  APP = 'app',
  ASSETS = 'assets',
  PROJECTS = 'projects',
  SETTINGS = 'settings',
}

// API
export const apiHeaders = {
  'Content-Type': 'application/json',
  'Accept-Type': 'application/json',
};

export enum ApiEndpoint {
  ASSETS = '/api/assets',
  PROJECTS = '/api/projects',
  PROJECTS_ID = '/api/projects/:id',
  SETTINGS = '/api/settings',
}

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ApiResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
}

// View
export const NOTIFICATION_LIFE: number = 5000;

export enum NotificationGroup {
  DELETE_PROCESSING = 'delete-processing',
  MESSAGE = 'message',
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum CssClass {
  HIDDEN = 'hidden',
}

export enum Popup {
  EDIT_PROJECT = 'edit-project',
}

export enum PageRoute {
  OVERVIEW = '/overview',
}

export enum HEXColorOpacity {
  OPACITY_0 = '00',
  OPACITY_5 = '0C',
  OPACITY_10 = '19',
  OPACITY_15 = '26',
  OPACITY_20 = '33',
  OPACITY_25 = '3F',
  OPACITY_30 = '4C',
  OPACITY_35 = '59',
  OPACITY_40 = '66',
  OPACITY_45 = '72',
  OPACITY_50 = '7F',
  OPACITY_55 = '8C',
  OPACITY_60 = '99',
  OPACITY_65 = 'A5',
  OPACITY_70 = 'B2',
  OPACITY_75 = 'BF',
  OPACITY_80 = 'CC',
  OPACITY_85 = 'D8',
  OPACITY_90 = 'E5',
  OPACITY_95 = 'F2',
  OPACITY_100 = 'FF',
}

// Store
export const defaultStoreState: StoreState = {
  app: {
    popup: null,
    notification: null,
    settings: null,
    assets: {
      colors: [],
      projectIcons: [],
    },
  },
  projects: {
    list: [],
    active: null,
  },
};

export enum StoreMutation {
  SET_POPUP = 'set-popup',
  SET_NOTIFICATION = 'set-notification',
  SET_SETTINGS = 'set-settings',
  ADD_ASSETS = 'add-assets',
  ADD_PROJECTS = 'add-projects',
  SET_ACTIVE_PROJECT = 'set-active-project',
}
