import type { ProjectsApi, ProjectsStorage, ProjectsController as BaseProjectController, AssetsColor } from 'shared/types';
import { Controller } from 'shared/constants';
import { Project } from 'models/project';
import { BaseController } from './base-controller';

export class ProjectController extends BaseController<ProjectsApi, ProjectsStorage> implements BaseProjectController {

  public getNewProject(): Project {
    const project: Project = Project.create();
    const color: AssetsColor = ProjectController.controllers[Controller.ASSETS].getAssets('colors')[0];
    
    project.color = color;

    return project;
  }

  public async loadProject(): Promise<boolean> {
    try {
      const projects: Project[] = await this.api.getProjects();
      
      this.storage.addProjects(projects);

      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }

  public async saveProject(project: Project): Promise<boolean> {
    try {
      if (Project.isNewProject(project)) {
        await this.createProject(project);
      } else {
        await this.updateProject(project);
      }
    
      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }

  public async deleteProject(project: Project): Promise<boolean> {
    try {
      await this.api.deleteProject(project.id);
      this.storage.removeProject(project.id);
    
      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }

  private async createProject(project: Project): Promise<void> {
    const createdProject: Project = await this.api.createProject(project.draft);

    this.storage.addProjects(createdProject);
  }

  private async updateProject(project: Project): Promise<void> {
    await this.api.updateProject(project.id, project.draft);
    this.storage.updateProject(project.updatedProject);
  }
}
