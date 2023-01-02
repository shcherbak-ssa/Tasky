import { Controller } from 'shared/constants';
import type { Project } from 'models/project';

// Assets
export type Assets = {
  colors: Color[];
}

export type Color = {
  id: number;
  color: string;
}

export interface AssetsController {
  loadAssets(): Promise<boolean>;
}

export interface AssetsApi {
  loadAssets(): Promise<Assets>;
}

export interface AssetsStorage {
  addAssets(assets: Assets): void
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
