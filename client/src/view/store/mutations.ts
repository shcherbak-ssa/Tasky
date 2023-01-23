import type { MutationTree } from 'vuex';
import type { Project } from 'models/project';
import type { Settings } from 'models/settings';
import type { AppNotification, Assets, StoreState } from 'shared/types';
import { Popup, StoreMutation } from 'shared/constants';

export type Mutations = {
  [StoreMutation.SET_POPUP](state: StoreState, popup: Popup | null): void;
  [StoreMutation.SET_NOTIFICATION](state: StoreState, notification: AppNotification | null): void;
  [StoreMutation.ADD_ASSETS](state: StoreState, assets: Assets): void;
  [StoreMutation.SET_SETTINGS](state: StoreState, settings: Settings): void;
  [StoreMutation.ADD_PROJECTS](state: StoreState, projects: Project[]): void;
  [StoreMutation.SET_ACTIVE_PROJECT](state: StoreState, project: Project | null): void;
}

export const mutations: MutationTree<StoreState> & Mutations = {

  [StoreMutation.SET_POPUP](state: StoreState, popup: Popup | null): void {
    state.app.popup = popup;
  },

  [StoreMutation.SET_NOTIFICATION](state: StoreState, notification: AppNotification | null): void {
    state.app.notification = notification;
  },

  [StoreMutation.ADD_ASSETS](state: StoreState, assets: Assets) : void {
    state.app.assets = assets;
  },

  [StoreMutation.SET_SETTINGS](state: StoreState, settings: Settings): void {
    state.app.settings = settings;
  },

  [StoreMutation.ADD_PROJECTS](state: StoreState, projects: Project[]): void {
    state.projects.list = [ ...projects ];
  },

  [StoreMutation.SET_ACTIVE_PROJECT](state: StoreState, project: Project | null): void {
    state.projects.active = project;
  },

};
