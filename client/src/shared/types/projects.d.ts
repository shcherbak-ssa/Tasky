import type { Project } from 'models/project';

export type ProjectSchema = {
  id: number;
  name: string;
  description: string;
}

export type ProjectDraft = Omit<ProjectSchema, 'id'>;

export type ProjectFitler = {}

export interface ProjectsController {
  createProject(): Project;
  loadProjects(): Promise<boolean>;
  save(project: Project): Promise<boolean>;
}

export interface ProjectsApi {
  getProjects(filter: ProjectFitler): Promise<ProjectSchema[]>;
}

export interface ProjectsStorage {
  addProjects(projects: ProjectSchema[]): void;
}
