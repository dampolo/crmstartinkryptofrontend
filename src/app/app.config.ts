import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const config = inject(ConfigService);
      return config.load();
    }),

    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return firstValueFrom(auth.checkAuth());
    }),

    ConfigService,

    AuthService,
    provideRouter(routes),

    provideBrowserGlobalErrorListeners(),
  ],
};
