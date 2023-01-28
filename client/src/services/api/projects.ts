import type { ProjectsApi as BaseProjectsApi, ProjectFitler, ProjectUpdates, ProjectSchema } from 'shared/types';
import { Project } from 'models/project';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './base-api';

export class ProjectsApi implements BaseProjectsApi {

  private constructor() {}

  public static create(): ProjectsApi {
    return new ProjectsApi();
  }

  public async getProject(id: number): Promise<Project> {
    const projectSchema: ProjectSchema = await BaseApi.get({
      endpoint: ApiEndpoint.PROJECTS_ID,
      params: { id },
    });

    return Project.create(projectSchema);
  }

  public async getProjects(filter: ProjectFitler = {}): Promise<Project[]> {
    const projectSchemas: ProjectSchema[] = await BaseApi.get({
      endpoint: ApiEndpoint.PROJECTS,
      body: filter,
    });

    return projectSchemas.map((schema) => Project.create(schema));
  }

  public async createProject(updates: ProjectUpdates): Promise<Project> {
    const projectSchema: ProjectSchema = await BaseApi.post({
      endpoint: ApiEndpoint.PROJECTS,
      body: updates,
    });

    return Project.create(projectSchema);
  }

  public async updateProject(id: number, updates: ProjectUpdates): Promise<void> {
    BaseApi.put({
      endpoint: ApiEndpoint.PROJECTS_ID,
      params: { id },
      body: updates,
    });
  }

  public async deleteProject(id: number): Promise<void> {
    BaseApi.delete({
      endpoint: ApiEndpoint.PROJECTS_ID,
      params: { id },
    });
  }

}
