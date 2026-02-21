import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './main-services/auth-service';
import { QuillModule } from 'ngx-quill';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateHttpLoader, } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.checkAuth();
    }),

    QuillModule,
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslateService({
      lang: 'de',
      fallbackLang: 'de',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
  ],
};


// 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