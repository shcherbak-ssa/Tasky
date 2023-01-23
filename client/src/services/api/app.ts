import type { AppApi as BaseAppApi } from 'shared/types';

export class AppApi implements BaseAppApi {

  public static create(): AppApi {
    return new AppApi();
  }

}
