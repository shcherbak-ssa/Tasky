import { ApiUrl } from 'shared/constants';
import { ProjectsApi as BaseProjectsApi, ProjectFitler, ProjectSchema } from 'shared/types';
import { BaseApi } from './base-api';

export class ProjectsApi extends BaseApi implements BaseProjectsApi {
  public async getProjects(filter: ProjectFitler): Promise<ProjectSchema[]> {
    return this.get(ApiUrl.PROJECTS, filter);
  }
}
