import { BaseValidator } from './base-validator';

export class AppValidator extends BaseValidator<{}> {

  public static create(): AppValidator {
    return new AppValidator();
  }

}
