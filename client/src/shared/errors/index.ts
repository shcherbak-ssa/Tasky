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

export class ApiError extends Error {
  name: string = ErrorName.API_ERROR;
  heading: string;

  constructor(heading: string, message: string) {
    super(message);
    this.heading = heading;
  }
}
