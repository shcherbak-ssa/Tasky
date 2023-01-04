import { inject } from 'vue';
import type { ControllerList } from 'shared/types';

export function useController<K extends keyof ControllerList>(key: K): ControllerList[K] {
  const projectsController: ControllerList[K] | undefined = inject(key);

  if (projectsController) {
    return projectsController;
  }

  throw new Error(`Miss controller '${key}'.`);
}
