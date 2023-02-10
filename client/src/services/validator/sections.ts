import Joi from 'joi';
import type { SectionUpdates } from 'shared/types';
import { BaseValidator } from './base-validator';

export class SectionsValidator extends BaseValidator<SectionUpdates> {

  protected schema: Joi.ObjectSchema<SectionUpdates> = Joi.object({
    name: Joi.string().trim().empty(),
  });

  protected schemaToCreate: Joi.ObjectSchema = this.schema.keys({
    name: this.schema.extract('name').required(),
  });

  public static create(): SectionsValidator {
    return new SectionsValidator();
  }

}
