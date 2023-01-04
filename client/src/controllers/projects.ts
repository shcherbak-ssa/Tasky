import type {
  ProjectsApi,
  ProjectsStorage,
  ProjectsController as BaseProjectController,
  ProjectSchema,
  AssetsColor,
  ProjectDraft,
} from 'shared/types';
import { Controller } from 'shared/constants';
import { Project } from 'models/project';
import { BaseController } from './base-controller';

export class ProjectController extends BaseController<ProjectsApi, ProjectsStorage> implements BaseProjectController {
  private static convertSchemaToProject(schemas: ProjectSchema[]): Project[] {
    return schemas.map((schema) => Project.create(schema));
  }

  public getNewProject(): Project {
    const project: Project = Project.create();
    const color: AssetsColor = ProjectController.controllers[Controller.ASSETS].getAssets('colors')[0];
    
    project.color = color;

    return project;
  }

  public async loadProject(): Promise<boolean> {
    try {
      const projectSchemas: ProjectSchema[] = await this.api.getProjects({});
      console.log(projectSchemas);
      const projects: Project[] = ProjectController.convertSchemaToProject(projectSchemas);

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
    const draft: Partial<ProjectDraft> = Project.getDraft(project);
    const createdProjectSchema: ProjectSchema = await this.api.createProject(draft);

    const [ createdProject ] = ProjectController.convertSchemaToProject([ createdProjectSchema ]);
    this.storage.addProjects(createdProject);
  }

  private async updateProject(project: Project): Promise<void> {
    const draft: Partial<ProjectDraft> = Project.getDraft(project);
    await this.api.updateProject(project.id, draft);

    const updatedSchema: ProjectSchema = Project.mergeSchemaWithDraft(project);
    const [ updatedProject ] = ProjectController.convertSchemaToProject([ updatedSchema ]);

    this.storage.updateProject(updatedProject);
  }
}
