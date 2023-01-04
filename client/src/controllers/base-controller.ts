import type { ControllerList } from 'shared/types';

export class BaseController<Api, Storage> {
  protected static controllers: ControllerList;

  public constructor(
    protected api: Api,
    protected storage: Storage,
  ) {}

  public static setControllers(controllers: ControllerList): void {
    BaseController.controllers = controllers;
  }
}
