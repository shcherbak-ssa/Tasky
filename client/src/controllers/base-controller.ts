export class BaseController<Api, Storage> {
  public constructor(
    protected api: Api,
    protected storage: Storage,
  ) {}
}
