import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './crm/services/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.checkAuth();
    }),

    AuthService,
    provideRouter(routes),

    provideBrowserGlobalErrorListeners(),
  ],
};


// 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