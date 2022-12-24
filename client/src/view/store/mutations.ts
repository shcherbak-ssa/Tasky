import { MutationTree } from 'vuex';
import { StoreMutation } from 'shared/constants';
import { StoreState } from 'shared/types';
import { Project } from 'models/project';

export type Mutations = {
  [StoreMutation.PROJECTS_ADD](state: StoreState, projects: Project[]): void;
}

export const mutations: MutationTree<StoreState> & Mutations = {
  [StoreMutation.PROJECTS_ADD](state: StoreState, projects: Project[]): void {
    state.projects = [...state.projects, ...projects];
  },
};
