import { StoreState } from 'shared/types';

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

export enum ApiUrl {
  ASSETS = '/api/assets',
  PROJECTS = '/api/projects',
}

export enum ApiMethod {
  GET = 'GET',
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
  ADD_ASSETS = 'add/assets',
  ADD_PROJECTS = 'add/projects',
}

// Icons
export enum IconName {
  SEARCH = 'ic:round-search',
  MENU = 'ic:round-menu',
  DASHBOARD = 'ic:round-dashboard',
  PROJECTS = 'mdi:calendar-check',
  NOTES = 'mdi:note-edit-outline',
}

// Styles
export enum CssVariables {
  CURRENT_PRIMARY_COLOR = '--current-primary-color',
}
