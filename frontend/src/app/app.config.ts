import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'; // ✅ Importar withFetch
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // 🔹 Rutas para la aplicación
    provideClientHydration(), // 🔹 Soporte para SSR (opcional)
    provideHttpClient(
      withFetch(), // ✅ Se añade withFetch() para usar la API fetch
      withInterceptorsFromDi() // ✅ Habilita interceptores tradicionales
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
