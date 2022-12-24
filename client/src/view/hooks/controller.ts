import { inject } from 'vue';
import { ControllerList } from 'shared/types';

export function useController<
  Key extends keyof ControllerList,
  Controller = ControllerList[Key]
>(key: Key): Controller {
  const projectsController: Controller | undefined = inject(key);

  if (projectsController) {
    return projectsController;
  }

  throw new Error(`Miss controller '${key}'.`);
}
