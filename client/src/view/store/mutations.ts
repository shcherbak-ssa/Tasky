import { MutationTree } from 'vuex';
import { StoreMutation } from 'shared/constants';
import { Assets, StoreState } from 'shared/types';
import { Project } from 'models/project';

export type Mutations = {
  [StoreMutation.ADD_ASSETS](state: StoreState, assets: Assets): void;
  [StoreMutation.ADD_PROJECTS](state: StoreState, projects: Project[]): void;
}

export const mutations: MutationTree<StoreState> & Mutations = {
  [StoreMutation.ADD_ASSETS](state: StoreState, assets: Assets) : void {
    state.assets = assets;
  },

  [StoreMutation.ADD_PROJECTS](state: StoreState, projects: Project[]): void {
    state.projects = [...state.projects, ...projects];
  },
};
