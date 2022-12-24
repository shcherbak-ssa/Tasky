import Ajv from 'ajv';

export class BaseValidator {
  protected ajv: Ajv;

  constructor() {
    this.ajv = new Ajv();
  }
}
