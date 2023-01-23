import type { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store as BaseStore, CommitOptions } from 'vuex';
import type { StoreState } from 'shared/types';
import { defaultStoreState } from 'shared/constants';
import { mutations, Mutations } from './mutations';
import { getters, Getters } from './getters';

export type Store = Omit<
  BaseStore<StoreState>,
  'getters' | 'commit'
> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  },
} & {
  commit<Key extends keyof Mutations, Payload extends Parameters<Mutations[Key]>>(
    key: Key,
    payload: Payload[1],
    options?: CommitOptions,
  ): ReturnType<Mutations[Key]>
};

export const storeKey: InjectionKey<Store> = Symbol();

export const store: Store = createStore({
  state() {
    return defaultStoreState;
  },

  getters,
  mutations,
});

export function useStore(): Store {
  return baseUseStore(storeKey);
}
