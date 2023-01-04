import type { ProjectsApi as BaseProjectsApi, ProjectFitler, ProjectSchema, ProjectDraft } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { BaseApi } from './base-api';

export class ProjectsApi extends BaseApi implements BaseProjectsApi {
  public async getProjects(filter: ProjectFitler): Promise<ProjectSchema[]> {
    return this.get(ApiEndpoint.PROJECTS, filter);
  }

  public async createProject(draft: Partial<ProjectDraft>): Promise<ProjectSchema> {
    return this.post(ApiEndpoint.PROJECTS, draft);
  }

  public async updateProject(id: number, draft: Partial<ProjectDraft>): Promise<void> {
    this.put({
      endpoint: ApiEndpoint.PROJECTS_ID,
      body: draft,
      params: { id },
    });
  }

  public async deleteProject(id: number): Promise<void> {
    this.delete({
      endpoint: ApiEndpoint.PROJECTS_ID,
      body: {},
      params: { id },
    });
  }
}
