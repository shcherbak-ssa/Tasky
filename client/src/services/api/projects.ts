import type { ProjectsApi as BaseProjectsApi, ProjectFitler, ProjectDraft, ProjectSchema } from 'shared/types';
import { Project } from 'models/project';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './base-api';

export class ProjectsApi implements BaseProjectsApi {
  public async getProjects(filter: ProjectFitler = {}): Promise<Project[]> {
    const projectSchemas: ProjectSchema[] = await BaseApi.get({
      endpoint: ApiEndpoint.PROJECTS,
      params: {},
      body: filter,
    });

    return projectSchemas.map((schema) => Project.create(schema));
  }

  public async createProject(draftProject: Partial<ProjectDraft>): Promise<Project> {
    const projectSchema: ProjectSchema = await BaseApi.post({
      endpoint: ApiEndpoint.PROJECTS,
      params: {},
      body: draftProject,
    });

    return Project.create(projectSchema);
  }

  public async updateProject(id: number, draft: Partial<ProjectDraft>): Promise<void> {
    BaseApi.put({
      endpoint: ApiEndpoint.PROJECTS_ID,
      params: { id },
      body: draft,
    });
  }

  public async deleteProject(id: number): Promise<void> {
    BaseApi.delete({
      endpoint: ApiEndpoint.PROJECTS_ID,
      params: { id },
      body: {},
    });
  }
}
