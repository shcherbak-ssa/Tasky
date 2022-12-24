import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store as BaseStore, CommitOptions } from 'vuex';
import { StoreState } from 'shared/types';
import { storeStateDefault } from 'shared/constants';
import { mutations, Mutations } from './mutations';

export type Store = Omit<
  BaseStore<StoreState>,
  'commit'
> & {
  commit<Key extends keyof Mutations, Payload extends Parameters<Mutations[Key]>>(
    key: Key,
    payload: Payload[1],
    options?: CommitOptions,
  ): ReturnType<Mutations[Key]>
};

export const storeKey: InjectionKey<Store> = Symbol();

export const store: Store = createStore({
  state() {
    return storeStateDefault;
  },

  mutations,
});

export function useStore(): Store {
  return baseUseStore(storeKey);
}
