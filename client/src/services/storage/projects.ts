import { Project } from 'models/project';
import { StoreMutation } from 'shared/constants';
import { ProjectsStorage as BaseProjectsStorage } from 'shared/types';
import { BaseStorage } from './base-storage';

export class ProjectsStorage extends BaseStorage implements BaseProjectsStorage {
  public addProjects(projects: Project[]): void {
    this.storage.commit(StoreMutation.PROJECTS_ADD, projects);
  }
}
