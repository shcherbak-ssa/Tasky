import { computed, ComputedRef } from 'vue';
import type { Project } from 'models/project';
import { type Store, useStore } from 'view/store';

export type ActiveProject = ComputedRef<Project>;

export function useActiveProject(): ActiveProject {
  const store: Store = useStore();

  return computed<Project>(() => {
    return store.getters.getActiveProject();
  });
}
