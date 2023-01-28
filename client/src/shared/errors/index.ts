import type { AppNotification, ErrorObject } from 'shared/types';
import { ErrorName, NotificationType } from 'shared/constants';

export class ValidationError<T> extends Error {
  name: string = ErrorName.VALIDATION_ERROR;
  errors: ErrorObject<T>;

  notification: AppNotification = {
    type: NotificationType.ERROR,
    heading: 'Validation error',
    message: 'You entered incorrect data or did not fill in the required fields',
  };

  constructor(errors: ErrorObject<T>) {
    super('');
    this.errors = errors;
  }
}
