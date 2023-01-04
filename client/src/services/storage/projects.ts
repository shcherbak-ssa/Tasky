import type { ProjectsStorage as BaseProjectsStorage } from 'shared/types';
import type { Project } from 'models/project';
import { StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class ProjectsStorage extends BaseStorage implements BaseProjectsStorage {
  public addProjects(payload: Project | Project[]): void {
    const projects: Project[] = Array.isArray(payload) ? payload : [ payload ];

    this.storage.commit(StoreMutation.PROJECTS_ADD, projects);
  }

  public updateProject(project: Project): void {
    this.storage.commit(StoreMutation.PROJECTS_UPDATE, project);
  }

  public removeProject(id: number): void {
    this.storage.commit(StoreMutation.PROJECTS_REMOVE, id);
  }
}
