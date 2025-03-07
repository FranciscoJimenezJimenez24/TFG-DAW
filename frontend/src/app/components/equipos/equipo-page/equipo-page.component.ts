import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposService } from '../../../services/equipos.service';
import { JugadoresService } from '../../../services/jugadores.service';
import { Equipo } from '../../../interfaces/equipo';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Jugador } from '../../../interfaces/jugador';
import { CommonModule } from '@angular/common';
import { PaisesService } from '../../../services/paises.service';

@Component({
  selector: 'app-equipo-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipo-page.component.html',
  styleUrl: './equipo-page.component.css'
})
export class EquipoPageComponent implements OnInit {

  equipo: Equipo | null = null;
  jugadores: Jugador[] = [];
  bandera: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private paisesService: PaisesService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.equiposService.getEquipo(id))
      )
      .subscribe(equipo => {
        if (!equipo) return this.router.navigate(['/equipos']);
        this.equipo = equipo;
        return;
      });
    this.getJugadoresEquipo();
    this.getPaisEquipo();
  }

  getJugadoresEquipo() {
    if (this.equipo) {
      this.jugadoresService.getJugadoresEquipo(this.equipo.id)
        .subscribe(jugadores => {
          this.jugadores = jugadores;
          this.jugadores.forEach(jugador => this.getPaisJugador(jugador.pais_id));
        });
    }
  }


  getPaisEquipo() {
    this.paisesService.getPais(this.equipo!.pais)
      .subscribe(pais => {
        this.bandera = pais.bandera;
      }
      );
  }

  banderasJugadores: { [key: number]: string } = {};

  getPaisJugador(id: number) {
    if (this.banderasJugadores[id]) {
      return;
    }
    this.paisesService.getPais(id)
      .subscribe(pais => {
        this.banderasJugadores[id] = pais.bandera;
      });
  }

}
