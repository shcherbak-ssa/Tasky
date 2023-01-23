import type { GetterTree } from 'vuex';
import type { AssetsColor, AssetsProjectIcon, StoreState } from 'shared/types';
import type { Project } from 'models/project';
import type { Settings } from 'models/settings';

export type Getters = {
  getAssetsColor(state: StoreState): (id: number) => AssetsColor;
  getAssetsProjectIcon(state: StoreState): (id: number) => AssetsProjectIcon;
  getSettings(state: StoreState): () => Settings;
  hasProject(state: StoreState): (id: number) => boolean;
  getProject(state: StoreState): (id: number) => Project | undefined;
  getActiveProject(state: StoreState): () => Project;
}

export const getters: GetterTree<StoreState, StoreState> & Getters = {

  getAssetsColor(state: StoreState) {
    return (searchId: number): AssetsColor => {
      const color: AssetsColor | undefined = state.app.assets.colors.find(({ id }) => id === searchId);

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
        = state.app.assets.projectIcons.find(({ id }) => id === searchId);

      if (projectIcon) {
        return projectIcon;
      }

      // @TODO: add error
      throw new Error('Project icon found');
    }
  },

  getSettings(state: StoreState) {
    return (): Settings => {
      if (state.app.settings) {
        return state.app.settings;
      }

      // @TODO: add error
      throw new Error('Settings not found');
    }
  },

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

};
