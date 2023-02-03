import type { ProjectMenuItem, ProjectsStorage as BaseProjectsStorage } from 'shared/types';
import type { Project } from 'models/project';
import { StoreMutation } from 'shared/constants';
import { BaseStorage } from './base-storage';

export class ProjectsStorage extends BaseStorage implements BaseProjectsStorage {

  public static create(): ProjectsStorage {
    return new ProjectsStorage();
  }

  public hasProject(id: number): boolean {
    return this.storage.getters.hasProject(id);
  }

  public getProject(id: number): Project | undefined {
    return this.storage.getters.getProject(id);
  }

  public getProjects(): Project[] {
    return this.storage.state.projects.list;
  }

  public setProjects(projects: Project[]): void {
    this.storage.commit(StoreMutation.ADD_PROJECTS, projects);
  }

  public removeProject(id: number): void {
    const updatedProjects: Project[] = this.storage.state.projects.list
      .filter((project) => {
        return project.id !== id;
      });

    this.setProjects(updatedProjects);
  }

  public setMenuItems(items: ProjectMenuItem[]): void {
    this.storage.commit(StoreMutation.SET_PROJECT_MENU_ITEMS, items);
  }

  public getActiveProject(): Project {
    return this.storage.getters.getActiveProject();
  }

  public setActiveProject(project: Project | null): void {
    this.storage.commit(StoreMutation.SET_ACTIVE_PROJECT, project);
  }

  public setPageProject(project: Project | null): void {
    this.storage.commit(StoreMutation.SET_PAGE_PROJECT, project);
  }

}
