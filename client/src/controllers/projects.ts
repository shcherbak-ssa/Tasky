import type {
  ProjectsApi,
  ProjectsStorage,
  ProjectsController as BaseProjectsController,
  ProjectUpdates,
  AssetsController,
  Validator,
  ErrorObject,
  AppController,
ProjectMenuItem,
} from 'shared/types';
import {
  Controller,
  EMPTY_STRING,
  ErrorName,
  NotificationGroup,
  NotificationType,
  UNDO_NOTIFICATION_LIFE,
  ZERO,
} from 'shared/constants';
import { Project } from 'models/project';
import { BaseController } from './base-controller';

export class ProjectsController
  extends BaseController<ProjectsApi, ProjectsStorage, ProjectUpdates>
  implements BaseProjectsController
{

  public static create(
    api: ProjectsApi,
    storage: ProjectsStorage,
    validator: Validator<ProjectUpdates>,
  ): ProjectsController {
    return new ProjectsController(api, storage, validator);
  }

  public activateProject(id: number = ZERO): boolean {
    try {
      let projectToActivate: Project;

      if (id === ZERO) {
        const assetsController: AssetsController = ProjectsController.controllers[Controller.ASSETS];

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

  public setPageProject(id: number): boolean {
    const project: Project | undefined = this.storage.getProject(id);

    if (project) {
      this.storage.setPageProject(project);
      return true;
    }

    return false;
  }

  public removePageProject(): void {
    this.storage.setPageProject(null);
  }

  public async loadProjectMenuItems(): Promise<boolean> {
    console.log('Load items');
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      const projectMenuItems: ProjectMenuItem[] = await this.api.getProjectMenuItems();
      this.storage.setMenuItems(projectMenuItems);

      return true;
    } catch (e: any) {
      console.log(e); // @TODO: add error

      if (e.name === ErrorName.API_ERROR) {
        appController.showNotification({
          type: NotificationType.ERROR,
          heading: e.heading,
          message: e.message,
        });
      }

      return false;
    }
  }

  public async loadProject(id: number): Promise<boolean> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      const project: Project = await this.api.getProject(id);
      this.addProjectToStorage(project);

      return true;
    } catch (e: any) {
      console.log(e); // @TODO: add error

      if (e.name === ErrorName.API_ERROR) {
        appController.showNotification({
          type: NotificationType.ERROR,
          heading: e.heading,
          message: e.message,
        });
      }

      return false;
    }
  }

  public async loadProjects(): Promise<boolean> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      const projects: Project[] = await this.api.getProjects();
      this.storage.setProjects(projects);

      await this.loadProjectMenuItems();

      return true;
    } catch (e: any) {
      console.log(e); // @TODO: add error

      if (e.name === ErrorName.API_ERROR) {
        appController.showNotification({
          type: NotificationType.ERROR,
          heading: e.heading,
          message: e.message,
        });
      }

      return false;
    }
  }

  public async saveProject(project: Project): Promise<ErrorObject<ProjectUpdates> | null> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];
    const isNewProject: boolean = project.isNewProject();

    try {
      const savedProject: Project = isNewProject
        ? await this.createProject(project)
        : await this.updateProject(project);

      this.updateActiveProject(savedProject);

      await this.loadProjectMenuItems();

      appController.showNotification({
        type: NotificationType.SUCCESS,
        heading: isNewProject ? 'Created' : 'Updated',
        message: `Project <strong>${project.name}</strong> is ${isNewProject ? 'created' : 'updated'} successfully`,
      });

      return null;
    } catch (e: any) {
      if (e.name === ErrorName.VALIDATION_ERROR) {
        appController.showNotification(e.notification);

        return e.errors;
      }

      if (e.name === ErrorName.API_ERROR) {
        appController.showNotification({
          type: NotificationType.ERROR,
          heading: e.heading,
          message: e.message,
        });
      }

      console.log(e); // @TODO: add error

      return null;
    }
  }

  public async archiveProject(projectToArchive: Project): Promise<boolean> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      appController.showNotification({
        type: NotificationType.INFO,
        heading: EMPTY_STRING,
        message: `Archiving <strong>${projectToArchive.name}</strong> project`,
        group: NotificationGroup.PROCESS,
      });

      projectToArchive.archive();

      await this.updateProject(projectToArchive);
      await this.loadProjectMenuItems();

      await appController.removeNotification();

      appController.showNotification({
        type: NotificationType.SUCCESS,
        heading: 'Archived',
        message: `Project <strong>${projectToArchive.name}</strong> is archived successfully`,
      });

      return true;
    } catch (e: any) {
      if (e.name === ErrorName.VALIDATION_ERROR) {
        appController.showNotification(e.notification);

        return false;
      }

      console.log(e); // @TODO: add error

      return false;
    }
  }

  public async restoreProject(projectToRestore: Project): Promise<boolean> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      appController.showNotification({
        type: NotificationType.INFO,
        heading: EMPTY_STRING,
        message: `Restoring <strong>${projectToRestore.name}</strong> project`,
        group: NotificationGroup.PROCESS,
      });

      projectToRestore.restore();

      await this.updateProject(projectToRestore);
      await this.loadProjectMenuItems();

      await appController.removeNotification();

      appController.showNotification({
        type: NotificationType.SUCCESS,
        heading: 'Restored',
        message: `Project <strong>${projectToRestore.name}</strong> is restored successfully`,
      });

      return true;
    } catch (e: any) {
      if (e.name === ErrorName.VALIDATION_ERROR) {
        appController.showNotification(e.notification);

        return false;
      }

      console.log(e); // @TODO: add error

      return false;
    }
  }

  public async deleteProject(projectToDelete: Project): Promise<boolean> {
    const appController: AppController = ProjectsController.controllers[Controller.APP];

    try {
      appController.showNotification({
        type: NotificationType.INFO,
        heading: EMPTY_STRING,
        message: `Deleting <strong>${projectToDelete.name}</strong> project`,
        group: NotificationGroup.PROCESS,
      });

      projectToDelete.delete();

      await this.updateProject(projectToDelete);
      await this.loadProjectMenuItems();

      this.storage.removeProject(projectToDelete.id);

      await appController.removeNotification();

      appController.showNotification({
        type: NotificationType.SUCCESS,
        heading: 'Deleted',
        message: `Project <strong>${projectToDelete.name}</strong> is deleted successfully`,
        group: NotificationGroup.UNDO,
        life: UNDO_NOTIFICATION_LIFE,
        undo: (): void => {
          const deletedProject: Project = projectToDelete.mergeWithUpdates();
          deletedProject.restore();

          this.updateProject(deletedProject);
          this.loadProjectMenuItems();
        },
      });

      return true;
    } catch (e) {
      console.log(e); // @TODO: add error
      return false;
    }
  }

  private async createProject(project: Project): Promise<Project> {
    let projectUpdates: ProjectUpdates = project.getUpdates();
    projectUpdates = this.validator.validateToCreate(projectUpdates);

    const createdProject: Project = await this.api.createProject(projectUpdates);
    this.addProjectToStorage(createdProject);

    return createdProject;
  }

  private async updateProject(project: Project): Promise<Project> {
    let projectUpdates: ProjectUpdates = project.getUpdates();
    projectUpdates = this.validator.validateToUpdate(projectUpdates);

    await this.api.updateProject(project.id, projectUpdates);

    const updatedProject: Project = project.mergeWithUpdates(projectUpdates);
    this.addProjectToStorage(updatedProject);

    return updatedProject;
  }

  private addProjectToStorage(projectToAdd: Project): void {
    const projects: Project[] = this.storage.getProjects();
    const projectIds: number[] = projects.map(({ id }) => id);

    let updatedProjects: Project[] = [];

    if (projectIds.includes(projectToAdd.id)) {
      updatedProjects = projects
        .map((project) => {
          return project.id === projectToAdd.id ? projectToAdd : project;
        });
    } else {
      updatedProjects = [ ...projects, projectToAdd ];
    }

    this.storage.setProjects(updatedProjects);
  }

}
