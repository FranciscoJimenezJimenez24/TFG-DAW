import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
    // { path: '', component: HomeComponent }, // Ruta del Home
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];
export const appConfig = {
    providers: [provideHttpClient()], // ✅ Proporciona el HttpClient aquí
    routes: routes // Rutas para tu aplicación
  };