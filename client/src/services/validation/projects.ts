import { ProjectDraft, Validator } from 'shared/types';
import { BaseValidator } from './base-validator';

// @TODO: implement
export class ProjectsValidator extends BaseValidator implements Validator<ProjectDraft> {
  // private properties: PropertiesSchema<ProjectDraft> = {};

  public validate<Key extends keyof ProjectDraft>(label: Key, value: ProjectDraft[Key]): void {}

  public validateToCreate(project: ProjectDraft): void {}

  public validateToUpdate(object: ProjectDraft): void {}
}
