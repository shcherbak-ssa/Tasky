import type { ControllerList, Validator } from 'shared/types';

export class BaseController<Api, Storage, ValidatorEntity> {
  protected static controllers: ControllerList;

  protected constructor(
    protected api: Api,
    protected storage: Storage,
    protected validator: Validator<ValidatorEntity>,
  ) {}

  public static setControllers(controllers: ControllerList): void {
    BaseController.controllers = controllers;
  }

}
