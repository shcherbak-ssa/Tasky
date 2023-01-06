import './styles/main.scss';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './styles/primevue.scss';
import './assets';

import { createApp } from 'vue';

import PrimevueConfig from 'primevue/config';
import PrimevueConfirmationService from 'primevue/confirmationservice';
import PrimevueToastService from 'primevue/toastservice';
import PrimevueTooltip from 'primevue/tooltip';
import PrimevueButton from 'primevue/button';
import PrimevueMessage from 'primevue/message';
import PrimevueScrollPanel from 'primevue/scrollpanel';
import PrimevueSkeleton from 'primevue/skeleton';
import PrimevueInputText from 'primevue/inputtext';
import PrimevueDivider from 'primevue/divider';
import PrimevueMenu from 'primevue/menu';
import PrimevueDialog from 'primevue/dialog';

import type { ControllerList } from 'shared/types';
import { router } from 'view/router';
import { store, storeKey } from 'view/store';

import AppContainer from 'view/containers/AppContainer.vue';
import BaseIcon from 'view/components/base/BaseIcon.vue';
import BaseLabel from 'view/components/base/BaseLabel.vue';

export function setupView(controllers: ControllerList): void {
  const app = createApp(AppContainer);

  app.use(router);
  app.use(store, storeKey);
  app.use(PrimevueConfig, { ripple: true });
  app.use(PrimevueConfirmationService);
  app.use(PrimevueToastService);
  app.use({
    install(app) {
      for (const [key, controller] of Object.entries(controllers)) {
        app.provide(key, controller);
      }
    },
  });

  app.directive('tooltip', PrimevueTooltip);

  app.component('BaseIcon', BaseIcon);
  app.component('BaseLabel', BaseLabel);
  app.component('BaseButton', PrimevueButton);
  app.component('BaseMessage', PrimevueMessage);
  app.component('BaseScrollPanel', PrimevueScrollPanel);
  app.component('BaseSkeleton', PrimevueSkeleton);
  app.component('BaseInputText', PrimevueInputText);
  app.component('BaseDivider', PrimevueDivider);
  app.component('BaseMenu', PrimevueMenu);
  app.component('BasePopup', PrimevueDialog);

  app.mount('#app');
}
