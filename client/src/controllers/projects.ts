import type {
  ProjectsApi,
  ProjectsStorage,
  ProjectsController as BaseProjectController,
  ProjectUpdates,
  AssetsController,
  Validator,
  ErrorObject,
  AppController,
} from 'shared/types';
import { Controller, EMPTY_STRING, ErrorName, NotificationGroup, NotificationType, ZERO } from 'shared/constants';
import { Project } from 'models/project';
import { BaseController } from './base-controller';

export class ProjectController
  extends BaseController<ProjectsApi, ProjectsStorage, ProjectUpdates>
  implements BaseProjectController
{

  public static create(
    api: ProjectsApi,
    storage: ProjectsStorage,
    validator: Validator<ProjectUpdates>,
  ): ProjectController {
    return new ProjectController(api, storage, validator);
  }

  public activateProject(id: number = ZERO): boolean {
    try {
      let projectToActivate: Project;

      if (id === ZERO) {
        const assetsController: AssetsController
          = ProjectController.controllers[Controller.ASSETS];

        projectToActivate = Project.create();
        projectToActivate.color = assetsController.getAssets('colors')[0];
        projectToActivate.icon = assetsController.getAssets('projectIcons')[0];
      } else {
        const foundProject: Project | undefined = this.storage.getProject(id);

        if (!foundProject) {
          throw new Error('Project hot found');
        }

        projectToActivate = Project.copy(foundProject);
      }

      this.storage.setActiveProject(projectToActivate);

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

  public updateActiveProject(activeProject: Project): void {
    this.storage.setActiveProject(activeProject);
  }

  public removeActiveProject(): void {
    this.storage.setActiveProject(null);
  }

  public async loadProjects(): Promise<boolean> {
    try {
      const projects: Project[] = await this.api.getProjects();
      this.storage.setProjects(projects);

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

  public async saveProject(project: Project): Promise<ErrorObject<ProjectUpdates> | null> {
    const appController: AppController = ProjectController.controllers[Controller.APP];
    const isNewProject: boolean = project.isNewProject();

    try {
      if (isNewProject) {
        await this.createProject(project);
      } else {
        await this.updateProject(project);
      }

      appController.showNotification({
        type: NotificationType.SUCCESS,
        heading: isNewProject ? 'Created' : 'Updated',
        message: `Project <strong>${project.name}</strong> ${isNewProject ? 'created' : 'updated'} successfully`,
      });

      return null;
    } catch (e: any) {
      if (e.name === ErrorName.VALIDATION_ERROR) {
        appController.showNotification(e.notification);

        return e.errors;
      }

      console.log(e); // @TODO: add error

      return null;
    }
  }

  public async deleteProject({ id, name: projectName }: Project): Promise<boolean> {
    const appController: AppController = ProjectController.controllers[Controller.APP];

    try {
      appController.showNotification({
        type: NotificationType.INFO,
        heading: EMPTY_STRING,
        message: `Deleting <strong>${projectName}</strong> project`,
        group: NotificationGroup.DELETE_PROCESSING,
      });

      await this.api.deleteProject(id);
      this.storage.removeProject(id);

      appController.removeNotification();

      setTimeout(() => {
        appController.showNotification({
          type: NotificationType.SUCCESS,
          heading: 'Deleted',
          message: `Project <strong>${projectName}</strong> deleted successfully`,
        });
      });

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

  private async createProject(project: Project): Promise<void> {
    let projectUpdates: ProjectUpdates = project.getUpdates();
    projectUpdates = this.validator.validateToCreate(projectUpdates);

    const createdProject: Project = await this.api.createProject(projectUpdates);
    this.storage.addProject(createdProject);
  }

  private async updateProject(project: Project): Promise<void> {
    let projectUpdates: ProjectUpdates = project.getUpdates();
    projectUpdates = this.validator.validateToUpdate(projectUpdates);

    await this.api.updateProject(project.id, projectUpdates);
    this.storage.updateProject(project.mergeWithUpdates(projectUpdates));
  }

}
