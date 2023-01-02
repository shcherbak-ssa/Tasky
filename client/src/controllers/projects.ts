import { ProjectsApi, ProjectsStorage, ProjectsController as BaseProjectController, ProjectSchema } from 'shared/types';
import { Project } from 'models/project';
import { BaseController } from './base-controller';

export class ProjectController extends BaseController<ProjectsApi, ProjectsStorage> implements BaseProjectController {
  public createProject(): Project {
    return Project.create();
  }

  public async loadProjects(): Promise<boolean> {
    try {
      const projectSchemas: ProjectSchema[] = await this.api.getProjects({});
      console.log(projectSchemas);
      const projects: Project[] = this.transformSchemaToModel(projectSchemas);

      this.storage.addProjects(projects);

      return true;
    } catch (e) {
      console.log(e); // @TODO: implement error
      return false;
    }
  }

  public async save(project: Project): Promise<boolean> {
    return true;
  }

  private transformSchemaToModel(schemas: ProjectSchema[]): Project[] {
    return schemas.map((schema) => Project.create(schema));
  }
}
