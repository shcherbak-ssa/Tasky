import type { ErrorObject } from 'shared/types';
import { ErrorName } from 'shared/constants';

export class ValidationError<T> extends Error {
  name: string = ErrorName.VALIDATION_ERROR;
  error: ErrorObject<T>;

  constructor(error: ErrorObject<T>) {
    super(error.message);
    this.error = error;
  }
}
