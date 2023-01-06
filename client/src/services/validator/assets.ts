import { BaseValidator } from './base-validator';

export class AssetsValidator extends BaseValidator<{}> {

  public static create(): AssetsValidator {
    return new AssetsValidator();
  }

}
