import './styles';
import './assets';

import { createApp } from 'vue';
import { ControllerList } from 'shared/types';
import AppLayout from 'view/layouts/AppLayout.vue';
import { router } from './router';
import { store, storeKey } from './store';

export function setupView(controllers: ControllerList): void {
  const app = createApp(AppLayout);

  app.use(router);
  app.use(store, storeKey);

  app.use({
    install(app) {
      for (const [key, controller] of Object.entries(controllers)) {
        app.provide(key, controller);
      }
    },
  });

  app.mount('#app');
}
