import type { GetterTree } from 'vuex';
import type { AssetsColor, AssetsProjectIcon, StoreState } from 'shared/types';
import type { Project } from 'models/project';
import type { Settings } from 'models/settings';

export type Getters = {
  getAssetsColor(state: StoreState): (id: number) => AssetsColor;
  getAssetsProjectIcon(state: StoreState): (id: number) => AssetsProjectIcon;

  hasProject(state: StoreState): (id: number) => boolean;
  getProject(state: StoreState): (id: number) => Project | undefined;
  getActiveProject(state: StoreState): () => Project;

  getSettings(state: StoreState): () => Settings;
}

export const getters: GetterTree<StoreState, StoreState> & Getters = {

  // Assets
  getAssetsColor(state: StoreState) {
    return (searchId: number): AssetsColor => {
      const color: AssetsColor | undefined = state.assets.colors.find(({ id }) => id === searchId);

      if (color) {
        return color;
      }

      // @TODO: add error
      throw new Error('Color found');
    }
  },

  getAssetsProjectIcon(state: StoreState) {
    return (searchId: number): AssetsProjectIcon => {
      const projectIcon: AssetsProjectIcon | undefined
        = state.assets.projectIcons.find(({ id }) => id === searchId);

      if (projectIcon) {
        return projectIcon;
      }

      // @TODO: add error
      throw new Error('Project icon found');
    }
  },

  // Projects
  hasProject(state: StoreState) {
    return (id: number): boolean => {
      return !!getters.getProject(state)(id);
    };
  },

  getProject(state: StoreState) {
    return (searchId: number): Project | undefined => {
      return state.projects.list.find(({ id }) => id === searchId);
    };
  },

  getActiveProject(state: StoreState) {
    return (): Project => {
      const { active: activeProject } = state.projects;

      if (activeProject) {
        return activeProject;
      }

      // @TODO: add error
      throw new Error('No project selected');
    };
  },

  // Settings
  getSettings(state: StoreState) {
    return (): Settings => {
      if (state.settings) {
        return state.settings;
      }

      // @TODO: add error
      throw new Error('Settings not found');
    }
  },

};
