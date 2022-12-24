import { StoreState } from 'shared/types';

export const ZERO = 0;
export const EMPTY_STRING = '';

// Controllers
export enum Controller {
  PROJECTS = 'controller/projects',
}

// API
export const apiHeaders = {
  'Content-Type': 'application/json',
  'Accept-Type': 'application/json',
};

export enum ApiUrl {
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
  projects: [],
};

export enum StoreMutation {
  PROJECTS_ADD = 'projects/add',
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
