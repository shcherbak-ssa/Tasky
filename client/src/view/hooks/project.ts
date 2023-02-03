import { computed, ComputedRef } from 'vue';
import type { Project } from 'models/project';
import { type Store, useStore } from 'view/store';

export type UseProject = ComputedRef<Project>;
export type UseProjectProps = { type: 'active' | 'page' };

export function useProject({ type }: UseProjectProps): UseProject {
  const store: Store = useStore();

  return computed<Project>(() => {
    return type === 'active'
      ? store.getters.getActiveProject()
      : store.getters.getPageProject();
  });
}
