import { Project } from 'models/project';
import { Controller } from 'shared/constants';
import {
  ControllerList,
  ProjectsController as BaseProjectsController,
  ProjectsApi as BaseProjectsApi,
  ProjectsStorage as BaseProjectsStorage,
  Validator,
  ProjectDraft,
} from 'shared/types';
import { ProjectController } from './controllers/projects';
import { ProjectsApi } from './services/api';
import { ProjectsStorage } from './services/storage';
import { ProjectsValidator } from './services/validation';
import { setupView } from './view';

const projectValidator: Validator<ProjectDraft> = new ProjectsValidator();
Project.setValidator(projectValidator);

const projectsApi: BaseProjectsApi = new ProjectsApi();
const projectsStorage: BaseProjectsStorage = new ProjectsStorage();
const projectsController: BaseProjectsController = new ProjectController(projectsApi, projectsStorage);

const constollers: ControllerList = {
  [Controller.PROJECTS]: projectsController,
};

setupView(constollers);
