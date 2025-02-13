import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { LigasComponent } from './components/ligas/ligas.component';
import { LigaPageComponent } from './components/ligas/liga-page/liga-page.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquipoPageComponent } from './components/equipos/equipo-page/equipo-page.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { JugadorPageComponent } from './components/jugadores/jugador-page/jugador-page.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'ligas/:id', component: LigaPageComponent },
    { path: 'ligas', component: LigasComponent  },
    { path: 'equipos/:id', component: EquipoPageComponent },
    { path: 'equipos', component: EquiposComponent },
    { path: 'jugadores/:id', component: JugadorPageComponent },
    { path: 'jugadores', component: JugadoresComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: '', component: HomeComponent  },
    // { path: '**', redirectTo: '' } // Redirigir rutas desconocidas
];

export const appConfig = {
    providers: [provideHttpClient()],
    routes: routes
};
