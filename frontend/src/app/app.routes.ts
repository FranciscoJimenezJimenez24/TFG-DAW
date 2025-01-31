import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { LigasComponent } from './components/ligas/ligas.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'ligas', component: LigasComponent  },
    { path: '', component: HomeComponent  },
    { path: '**', redirectTo: '' } // Redirigir rutas desconocidas
];

export const appConfig = {
    providers: [provideHttpClient()],
    routes: routes
};
