import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideServiceWorker } from '@angular/service-worker';


const isProd = true;
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideServiceWorker('ngsw-worker.js', {
      enabled: isProd,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
})
  .catch((err) => console.error(err));
