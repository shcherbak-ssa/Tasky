import type { StoreState } from 'shared/types';

export const ZERO = 0;
export const EMPTY_STRING = '';

// Controllers
export enum Controller {
  ASSETS = 'controller/assets',
  PROJECTS = 'controller/projects',
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

// Pages
export enum PageRoute {
  PROJECTS = '/projects',
  PROJECTS_CREATE = '/projects/create',
}

// Store
export const storeStateDefault: StoreState = {
  assets: {
    colors: [],
  },
  projects: [],
};

export enum StoreMutation {
  ASSETS_ADD = 'assets/add',
  PROJECTS_ADD = 'projects/add',
  PROJECTS_UPDATE = 'projects/update',
  PROJECTS_REMOVE = 'projects/remove',
}

// Icons
export enum IconName {
  SEARCH = 'pi-search',
  MENU = 'pi-bars',
}

// Styles
export enum CssVariables {
  CURRENT_PRIMARY_COLOR = '--current-primary-color',
}
