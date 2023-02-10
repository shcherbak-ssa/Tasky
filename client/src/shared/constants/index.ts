import type { StoreState } from 'shared/types';

export * from './settings';
export * from './projects';

export const ZERO: number = 0;
export const EMPTY_STRING: string = '';
export const QUERY_URL_SEPARATOR: string = '?';

export enum ErrorName {
  API_ERROR = 'ApiError',
  VALIDATION_ERROR = 'ValidationError',
}

// Controllers
export enum Controller {
  APP = 'app',
  ASSETS = 'assets',
  PROJECTS = 'projects',
  SECTIONS = 'sections',
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
  PROJECTS_MENU_ITEMS = '/api/projects/menu-items',
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
export const UNDO_NOTIFICATION_LIFE: number = 20000;
export const PAGE_TITLE_DIVIDER: string = ' | ';

export enum NotificationGroup {
  MESSAGE = 'message',
  PROCESS = 'process',
  UNDO = 'undo',
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum CssClass {
  HIDDEN = 'hidden',
}

export enum ProjectPageTabKey {
  OVERVIEW = 'overview',
  LIST = 'list',
  BOARD = 'board',
}

export enum Popup {
  EDIT_PROJECT = 'edit-project',
}

export enum PageName {
  PROJECT = 'project',
}

export enum PagePath {
  HOME = '/',
  PROJECT = '/projects/:id',
}

export enum PageTitle {
  BASE = 'Tasky',
  HOME = 'Home',
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
  },
  assets: {
    colors: [],
    projectIcons: [],
  },
  projects: {
    list: [],
    menuItems: [],
    active: null,
    page: null,
  },
};

export enum StoreMutation {
  SET_POPUP = 'set-popup',
  SET_NOTIFICATION = 'set-notification',
  SET_SETTINGS = 'set-settings',
  SET_PAGE_META = 'set-page-meta',
  ADD_ASSETS = 'add-assets',
  ADD_PROJECTS = 'add-projects',
  SET_PROJECT_MENU_ITEMS = 'set-project-menu-items',
  SET_ACTIVE_PROJECT = 'set-active-project',
  SET_PAGE_PROJECT = 'set-page-project',
  UPDATE_PROJECT_SECTIONS = 'update-project-sections',
}
