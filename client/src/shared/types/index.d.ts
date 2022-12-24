import { Controller } from 'shared/constants';
import type { Project } from 'models/project';
import { ProjectsController } from './projects';

export * from './projects';

// Controllers
export type ControllerList = {
  [Controller.PROJECTS]: ProjectsController;
}

// Store
export type StoreState = {
  projects: Project[];
}

// Validation
export interface Validator<Type> {
  validate<Key extends keyof Type>(label: Key, value: Type[Key]): void;
  validateToCreate(object: Type): void;
  validateToUpdate(object: Type): void;
}
