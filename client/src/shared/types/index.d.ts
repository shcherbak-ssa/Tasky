import type { Project } from 'models/project';
import { ApiEndpoint, Controller } from 'shared/constants';

// Api
export type ApiRequest<B, P> = {
  endpoint: ApiEndpoint;
  body: B;
  params: P;
}

// Assets
export type Assets = {
  colors: AssetsColor[];
}

export type AssetsColor = {
  id: number;
  color: string;
}

export interface AssetsController {
  loadAssets(): Promise<boolean>;
  getAssets<K extends keyof Assets>(key: K): Assets[K];
}

export interface AssetsApi {
  loadAssets(): Promise<Assets>;
}

export interface AssetsStorage {
  addAssets(assets: Assets): void
  getAssets<K extends keyof Assets>(key: K): Assets[K];
}

// Controllers
export type ControllerList = {
  [Controller.ASSETS]: AssetsController;
  [Controller.PROJECTS]: ProjectsController;
}

// Store
export type StoreState = {
  assets: Assets;
  projects: Project[];
}

// Validation
export interface Validator<Type> {
  validate<Key extends keyof Type>(label: Key, value: Type[Key]): void;
  validateToCreate(object: Type): void;
  validateToUpdate(object: Type): void;
}

// Projects
export type ProjectSchema = {
  id: number;
  name: string;
  description: string;
  color: AssetsColor;
}

export type ProjectDraft = Omit<ProjectSchema, 'id'>;

export type ProjectFitler = {}

export interface ProjectsController {
  getNewProject(): Project;
  loadProject(): Promise<boolean>;
  saveProject(project: Project): Promise<boolean>;
  deleteProject(project: Project): Promise<boolean>;
}

export interface ProjectsApi {
  getProjects(filter: ProjectFitler): Promise<ProjectSchema[]>;
  createProject(draft: Partial<ProjectDraft>): Promise<ProjectSchema>;
  updateProject(id: number, draft: Partial<ProjectDraft>): Promise<void>;
  deleteProject(id: number): Promise<void>;
}

export interface ProjectsStorage {
  addProjects(payload: Project | Project[]): void;
  updateProject(project: Project): void;
  removeProject(id: number): void;
}
