import type {
  ControllerList,
  AppController as BaseAppController,
  AssetsController as BaseAssetsController,
  ProjectsController as BaseProjectsController,
  SettingsController as BaseSettingsController,
} from 'shared/types';
import { Controller } from 'shared/constants';
import { AppController, AssetsController, BaseController, ProjectController, SettingsController } from './controllers';
import { AppApi, AssetsApi, ProjectsApi, SettingsApi } from './services/api';
import { AppStorage, AssetsStorage, ProjectsStorage, SettingsStorage } from './services/storage';
import { AppValidator, AssetsValidator, ProjectsValidator, SettingsValidator } from './services/validator';
import { setupView } from './view';

const controllers: ControllerList = setupControllers();

setupView(controllers);

function setupControllers(): ControllerList {
  const appController: BaseAppController = AppController
    .create(
      AppApi.create(),
      AppStorage.create(),
      AppValidator.create(),
    );
  
  const assetsController: BaseAssetsController = AssetsController
    .create(
      AssetsApi.create(),
      AssetsStorage.create(),
      AssetsValidator.create(),
    );
  
  const projectsController: BaseProjectsController = ProjectController
    .create(
      ProjectsApi.create(),
      ProjectsStorage.create(),
      ProjectsValidator.create(),
    );

  const settingsController: BaseSettingsController = SettingsController
    .create(
      SettingsApi.create(),
      SettingsStorage.create(),
      SettingsValidator.create(),
    );
  
  const controllers: ControllerList = {
    [Controller.APP]: appController,
    [Controller.ASSETS]: assetsController,
    [Controller.PROJECTS]: projectsController,
    [Controller.SETTINGS]: settingsController,
  };
  
  BaseController.setControllers(controllers);

  return controllers;
}
