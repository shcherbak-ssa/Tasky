import type { AssetsColor, AssetsProjectIcon, ErrorObject } from 'shared/types';
import type { Project } from 'models/project';

export type ProjectsState = {
  list: Project[];
  active: Project | null;
}

export type ProjectSchema = {
  id: number;
  name: string;
  description: string;
  color: AssetsColor;
  icon: AssetsProjectIcon;
  dueDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type ProjectUpdates = Partial<Omit<ProjectSchema, 'id'>>;

export type ProjectFitler = {}

export interface ProjectsController {
  activateProject(id?: number): boolean;
  updateActiveProject(activateProject: Project): void;
  removeActiveProject(): void
  loadProjects(): Promise<boolean>;
  saveProject(project: Project): Promise<ErrorObject<ProjectUpdates> | null>;
  deleteProject(project: Project): Promise<boolean>;
}

export interface ProjectsApi {
  getProject(id: number): Promise<Project>;
  getProjects(filter?: ProjectFitler): Promise<Project[]>;
  createProject(updates: ProjectUpdates): Promise<Project>;
  updateProject(id: number, updates: ProjectUpdates): Promise<void>;
  deleteProject(id: number): Promise<void>;
}

export interface ProjectsStorage {
  hasProject(id: number): boolean;
  getProject(id: number): Project | undefined;
  setProjects(projects: Project[]): void;
  addProject(project: Project): void;
  updateProject(project: Project): void;
  removeProject(id: number): void;
  getActiveProject(): Project;
  setActiveProject(project: Project | null): void;
}