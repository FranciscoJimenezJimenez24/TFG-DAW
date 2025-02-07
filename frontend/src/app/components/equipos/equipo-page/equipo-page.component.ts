import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposService } from '../../../services/equipos.service';
import { JugadoresService } from '../../../services/jugadores.service';
import { Equipo } from '../../../interfaces/equipo';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Jugador } from '../../../interfaces/jugador';
import { CommonModule } from '@angular/common';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
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
  }

  getJugadoresEquipo(){
    if (this.equipo) {
      this.jugadoresService.getJugadoresEquipo(this.equipo.id)
        .subscribe(jugadores =>{
          this.jugadores = jugadores;
        });
    }
  }

}
