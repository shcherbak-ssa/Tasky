import type { ProjectsStorage as BaseProjectsStorage } from 'shared/types';
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

  public setProjects(projects: Project[]): void {
    this.storage.commit(StoreMutation.ADD_PROJECTS, projects);
  }

  public addProject(project: Project): void {
    this.setProjects([ ...this.storage.state.projects.list, project ]);
  }

  public updateProject(projectToUpdate: Project): void {
    const updatedProjects: Project[] = this.storage.state.projects.list
      .map((project) => {
        return project.id === projectToUpdate.id ? projectToUpdate : project;
      });

    this.setProjects(updatedProjects);
  }

  public removeProject(id: number): void {
    const updatedProjects: Project[] = this.storage.state.projects.list
      .filter((project) => {
        return project.id !== id;
      });

    this.setProjects(updatedProjects);
  }

  public getActiveProject(): Project {
    return this.storage.getters.getActiveProject();
  }

  public setActiveProject(project: Project | null): void {
    this.storage.commit(StoreMutation.SET_ACTIVE_PROJECT, project);
  }

}