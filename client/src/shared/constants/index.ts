import type { StoreState } from 'shared/types';

export * from './settings';
export * from './projects';

export const ZERO = 0;
export const EMPTY_STRING = '';

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
}

// View
export const TOAST_LIFE: number = 3000;

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

export enum ToastGroup {
  DELETE_PROCESSING = 'delete-processing',
  MESSAGE = 'message',
}

// Store
export const defaultStoreState: StoreState = {
  app: {
    activePopup: null,
  },
  assets: {
    colors: [],
    projectIcons: [],
  },
  projects: {
    list: [],
    active: null,
  },
  settings: null,
};

export enum StoreMutation {
  SET_ACTIVE_POPUP = 'set-active-popup',
  ADD_ASSETS = 'add-assets',
  ADD_PROJECTS = 'add-projects',
  SET_ACTIVE_PROJECT = 'set-active-project',
  SET_SETTINGS = 'set-settings',
}
