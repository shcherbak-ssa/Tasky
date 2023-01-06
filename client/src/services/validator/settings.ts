import Joi from 'joi';
import type { SettingsUpdates } from 'shared/types';
import { ProjectsView } from 'shared/constants';
import { BaseValidator } from './base-validator';

export class SettingsValidator extends BaseValidator<SettingsUpdates> {
  
  protected schema: Joi.ObjectSchema<SettingsUpdates> = Joi.object({
    id: Joi.number().required(),
    projectsView: Joi.string().valid(ProjectsView.LIST, ProjectsView.TILES),
  });
  
  public static create(): SettingsValidator {
    return new SettingsValidator();
  }

}
