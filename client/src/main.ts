import { Project } from 'models/project';
import { Controller } from 'shared/constants';
import {
  AssetsApi as BaseAssetsApi,
  AssetsStorage as BaseAssetsStorage,
  AssetsController as BaseAssetsController,
  ControllerList,
  ProjectsController as BaseProjectsController,
  ProjectsApi as BaseProjectsApi,
  ProjectsStorage as BaseProjectsStorage,
  Validator,
  ProjectDraft,
} from 'shared/types';
import { AssetsController, ProjectController } from './controllers';
import { AssetsApi, ProjectsApi } from './services/api';
import { ProjectsStorage } from './services/storage';
import { AssetsStorage } from './services/storage/assets';
import { ProjectsValidator } from './services/validation';
import { setupView } from './view';

const projectValidator: Validator<ProjectDraft> = new ProjectsValidator();
Project.setValidator(projectValidator);

const assetsApi: BaseAssetsApi = new AssetsApi();
const assetsStorage: BaseAssetsStorage = new AssetsStorage();
const assetsController: BaseAssetsController = new AssetsController(assetsApi, assetsStorage);

const projectsApi: BaseProjectsApi = new ProjectsApi();
const projectsStorage: BaseProjectsStorage = new ProjectsStorage();
const projectsController: BaseProjectsController = new ProjectController(projectsApi, projectsStorage);

const constollers: ControllerList = {
  [Controller.ASSETS]: assetsController,
  [Controller.PROJECTS]: projectsController,
};

setupView(constollers);
