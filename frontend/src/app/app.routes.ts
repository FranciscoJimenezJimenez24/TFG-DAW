import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { provideHttpClient } from '@angular/common/http';
import { AfterLoginService } from './services/after-login.service';

export const routes: Routes = [
    // { path: '', component: HomeComponent }, // Ruta del Home
    { path: 'login', component: LoginComponent, canMatch: [AfterLoginService]},
    { path: 'signup', component: SignupComponent, canMatch: [AfterLoginService]},
];
export const appConfig = {
    providers: [provideHttpClient()], // ✅ Proporciona el HttpClient aquí
    routes: routes // Rutas para tu aplicación
  };