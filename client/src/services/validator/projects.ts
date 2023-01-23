import Joi from 'joi';
import type { ProjectUpdates } from 'shared/types';
import { projectValidationRules } from 'shared/constants';
import { BaseValidator } from './base-validator';

export class ProjectsValidator extends BaseValidator<ProjectUpdates> {

  protected schema: Joi.ObjectSchema<ProjectUpdates> = Joi.object({
    name: Joi.string().empty(),
    description: Joi.string(),
    color: Joi.object({
      id: Joi.number(),
      bgColor: Joi.string().length(projectValidationRules.bgColorLength),
      textColor: Joi.string().length(projectValidationRules.textColorLength),
    }),
    icon: Joi.object({
      id: Joi.number(),
      family: Joi.string().max(projectValidationRules.iconGroupLength),
      name: Joi.string().max(projectValidationRules.iconNameLength),
    }),
    dueDate: Joi.date().empty(null),
    createdAt: Joi.date().empty(null),
    updatedAt: Joi.date().empty(null),
  });

  protected schemaToCreate: Joi.ObjectSchema = this.schema.keys({
    name: this.schema.extract('name').required(),
    color: this.schema.extract('color').required(),
    createdAt: this.schema.extract('createdAt').required(),
  });

  protected schemaToUpdate: Joi.ObjectSchema = this.schema.keys({
    updatedAt: this.schema.extract('updatedAt').required(),
  });

  public static create(): ProjectsValidator {
    return new ProjectsValidator();
  }

}
