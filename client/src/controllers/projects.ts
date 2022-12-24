import { Project } from 'models/project';
import { ProjectsApi, ProjectsStorage, ProjectsController as BaseProjectController, ProjectSchema } from 'shared/types';

export class ProjectController implements BaseProjectController {
  public constructor(
    private api: ProjectsApi,
    private storage: ProjectsStorage,
  ) {}

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
      console.log(e);

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
