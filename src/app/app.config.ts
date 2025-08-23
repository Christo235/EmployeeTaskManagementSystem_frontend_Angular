import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { intersepterJwtInterceptor } from './Interseptor/intersepter-jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([intersepterJwtInterceptor]),
      withFetch()
    ),
  ]
};
