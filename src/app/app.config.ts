import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './main-services/auth-service';
import { QuillModule } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.checkAuth();
    }),

    QuillModule,
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
  ],
};


// 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