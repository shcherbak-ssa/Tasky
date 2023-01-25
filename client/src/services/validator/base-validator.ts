import Joi from 'joi';
import type { ErrorObject, Validator } from 'shared/types';
import { ValidationError } from 'shared/errors';
import { cloneObject } from 'shared/utils';

export class BaseValidator<T> implements Validator<T> {

  protected schema: Joi.ObjectSchema<T> = Joi.object();
  protected schemaToCreate: Joi.ObjectSchema = Joi.object();
  protected schemaToUpdate: Joi.ObjectSchema = Joi.object();

  protected constructor() {}

  public validateToCreate(updates: T): T {
    const { error, value } = this.schemaToCreate.validate(updates);

    if (error) {
      this.throwValidationError(error);
    }

    return cloneObject(value);
  }

  public validateToUpdate(updates: T): T {
    const { error, value } = this.schemaToUpdate.validate(updates);

    if (error) {
      this.throwValidationError(error);
    }

    return cloneObject(value);
  }

  private throwValidationError(error: Joi.ValidationError): void {
    const errors = Object.fromEntries(
      error.details.map(({ message, context }) => {
        return [ context?.key as keyof T, message ];
      })
    ) as ErrorObject<T>;

    throw new ValidationError<T>(errors);
  }

}
