import type { AssetsColor, AssetsProjectIcon, ErrorObject } from 'shared/types';
import type { Project } from 'models/project';

export type ProjectsState = {
  list: Project[];
  active: Project | null;
  page: Project | null;
}

export type ProjectSchema = {
  id: number;
  name: string;
  description: string;
  color: AssetsColor;
  icon: AssetsProjectIcon;
  hasDueDate: boolean;
  dueDate: Date | null;
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
}

export type ProjectUpdates = Partial<Omit<ProjectSchema, 'id'>>;

export type ProjectFitler = {}

export interface ProjectsController {
  activateProject(id?: number): boolean;
  updateActiveProject(activateProject: Project): void;
  removeActiveProject(): void
  setPageProject(id: number): boolean;
  removePageProject(): void;
  loadProject(id: number): Promise<boolean>;
  loadProjects(): Promise<boolean>;
  saveProject(project: Project): Promise<ErrorObject<ProjectUpdates> | null>;
  archiveProject(project: Project): Promise<boolean>;
  restoreProject(project: Project): Promise<boolean>;
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
  getProjects(): Project[];
  setProjects(projects: Project[]): void;
  removeProject(id: number): void;
  getActiveProject(): Project;
  setActiveProject(project: Project | null): void;
  setPageProject(project: Project | null): void;
}
