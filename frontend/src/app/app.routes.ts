import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { LigasComponent } from './components/ligas/ligas.component';
import { LigaPageComponent } from './components/ligas/liga-page/liga-page.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquipoPageComponent } from './components/equipos/equipo-page/equipo-page.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { JugadorPageComponent } from './components/jugadores/jugador-page/jugador-page.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PartidoPageComponent } from './components/partidos/partido-page/partido-page.component';
import { NoticiaPageComponent } from './components/noticias/noticia-page/noticia-page.component';
import { JugadoresEstadisticasComponent } from './components/jugadores-estadisticas/jugadores-estadisticas.component';
import { RoleGuardService } from './guards/role.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BeforeLoginGuard } from './guards/before-login.guard';
import { AfterLoginGuard } from './guards/after-login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AfterLoginGuard] },
    { path: 'login', component: LoginComponent, canActivate: [BeforeLoginGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginGuard] },
    { path: 'ligas/:id', component: LigaPageComponent, canActivate: [AfterLoginGuard] },
    { path: 'ligas', component: LigasComponent, canActivate: [AfterLoginGuard] },
    { path: 'equipos/:id', component: EquipoPageComponent, canActivate: [AfterLoginGuard] },
    { path: 'equipos', component: EquiposComponent, canActivate: [AfterLoginGuard] },
    { path: 'jugadores/estadisticas', component: JugadoresEstadisticasComponent, canActivate: [AfterLoginGuard] },
    { path: 'jugadores/:id', component: JugadorPageComponent, canActivate: [AfterLoginGuard] },
    { path: 'jugadores', component: JugadoresComponent, canActivate: [AfterLoginGuard] },
    { path: 'partidos/:id', component: PartidoPageComponent, canActivate: [AfterLoginGuard] },
    { path: 'partidos', component: PartidosComponent, canActivate: [AfterLoginGuard] },
    { path: 'noticias', component: NoticiasComponent, canActivate: [AfterLoginGuard] },
    { path: 'noticias/:id', component: NoticiaPageComponent, canActivate: [AfterLoginGuard] },
    {
        path: 'contacto',
        component: ContactoComponent,
        canActivate: [AfterLoginGuard, RoleGuardService],
        data: { roles: ['user'] }
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AfterLoginGuard, RoleGuardService],
        data: { roles: ['admin'] }
    },
    {
        path: 'solicitudes',
        component: SolicitudesComponent,
        canActivate: [AfterLoginGuard, RoleGuardService],
        data: { roles: ['admin'] }
    },
    { path: '**', component: NotFoundComponent }
];

export const appConfig = {
    providers: [provideHttpClient()],
    routes: routes
};
