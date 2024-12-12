import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Importar withFetch

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // 🔹 Rutas para la aplicación
    provideClientHydration(), // 🔹 Soporte para SSR (opcional)
    provideHttpClient(withFetch()) // ✅ Se añade withFetch() para usar la API fetch
  ]
};
