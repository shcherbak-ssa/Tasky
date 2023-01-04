import type { MutationTree } from 'vuex';
import type { Project } from 'models/project';
import type { Assets, StoreState } from 'shared/types';
import { StoreMutation } from 'shared/constants';

export type Mutations = {
  [StoreMutation.ASSETS_ADD](state: StoreState, assets: Assets): void;

  [StoreMutation.PROJECTS_ADD](state: StoreState, projects: Project[]): void;
  [StoreMutation.PROJECTS_UPDATE](state: StoreState, project: Project): void;
  [StoreMutation.PROJECTS_REMOVE](state: StoreState, id: number): void;
}

export const mutations: MutationTree<StoreState> & Mutations = {
  [StoreMutation.ASSETS_ADD](state: StoreState, assets: Assets) : void {
    state.assets = assets;
  },

  [StoreMutation.PROJECTS_ADD](state: StoreState, projects: Project[]): void {
    state.projects = [...state.projects, ...projects];
  },

  [StoreMutation.PROJECTS_UPDATE](state: StoreState, projectToUpdate: Project): void {
    state.projects = state.projects.map((project) => {
      return project.id === projectToUpdate.id ? projectToUpdate : project;
    });
  },

  [StoreMutation.PROJECTS_REMOVE](state: StoreState, idToRemove: number): void {
    state.projects = state.projects.filter(({ id }) => id !== idToRemove);
  },
};
