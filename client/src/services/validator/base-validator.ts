import Joi from 'joi';
import type { ErrorObject, Validator } from 'shared/types';
import { ValidationError } from 'shared/errors';

export class BaseValidator<T> implements Validator<T> {

  protected schema: Joi.ObjectSchema<T> = Joi.object();
  protected schemaToCreate: Joi.ObjectSchema = Joi.object();
  protected schemaToUpdate: Joi.ObjectSchema = Joi.object();

  protected constructor() {}

  public validateToCreate(projectUpdates: T): void {
    const { error } = this.schemaToCreate.validate(projectUpdates);

    if (error) {
      this.throwValidationError(error);
    }
  }

  public validateToUpdate(projectUpdates: T): void {
    const { error } = this.schemaToUpdate.validate(projectUpdates);

    if (error) {
      this.throwValidationError(error);
    }
  }

  private throwValidationError(error: Joi.ValidationError): void {
    const errors = Object.fromEntries(
      error.details.map(({ message, context }) => [ context?.key as keyof T, message ])
    ) as ErrorObject<T>;

    throw new ValidationError<T>(errors);
  }

}
