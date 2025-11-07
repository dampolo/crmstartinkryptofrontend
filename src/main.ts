import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeDe);

bootstrapApplication(App, {
  ...appConfig,
  providers: [ provideHttpClient(),
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue: 'de-DE' } // 🇩🇪 Set locale globally
  ]
}).catch(err => console.error(err));
