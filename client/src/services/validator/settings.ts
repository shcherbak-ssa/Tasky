import Joi from 'joi';
import type { SettingsUpdates } from 'shared/types';
import { ProjectsView } from 'shared/constants';
import { BaseValidator } from './base-validator';

export class SettingsValidator extends BaseValidator<SettingsUpdates> {
  
  protected schema: Joi.ObjectSchema<SettingsUpdates> = Joi.object({
    id: Joi.number().required(),
    projectsView: Joi.string().valid(ProjectsView.LIST, ProjectsView.TILES),
    updatedAt: Joi.date().empty(null),
  });

  protected schemaToUpdate: Joi.ObjectSchema = this.schema.keys({
    updatedAt: this.schema.extract('updatedAt').required(),
  });
  
  public static create(): SettingsValidator {
    return new SettingsValidator();
  }

}
