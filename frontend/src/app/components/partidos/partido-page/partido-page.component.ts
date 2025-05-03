import { Component, OnInit } from '@angular/core';
import { Partido } from '../../../interfaces/partido';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidosService } from '../../../services/partidos.service';
import { switchMap } from 'rxjs';
import { Equipo } from '../../../interfaces/equipo';
import { EquiposService } from '../../../services/equipos.service';
import { CommonModule } from '@angular/common';
import { Temporada } from '../../../interfaces/temporada';
import { Liga } from '../../../interfaces/liga';
import { TemporadasService } from '../../../services/temporadas.service';
import { LigasService } from '../../../services/ligas.service';

@Component({
  selector: 'app-partido-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partido-page.component.html',
  styleUrl: './partido-page.component.css'
})
export class PartidoPageComponent implements OnInit {

  partido: Partido | null = null;
  equipoLocal: Equipo | null = null;
  equipoVisitante: Equipo | null = null;
  temporada: Temporada | null = null;
  liga: Liga | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private partidosService: PartidosService,
    private equiposService: EquiposService,
    private temporadasService: TemporadasService,
    private ligasService: LigasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.partidosService.getPartido(id))
      )
      .subscribe(partido => {
        if (!partido) return this.router.navigate(['/partidos']);
        this.partido = partido;

        this.getEquipoLocal(partido.equipo_local_id);
        this.getEquipoVisitante(partido.equipo_visitante_id);
        this.getTemporada(partido.temporada_id);
        this.getLiga(partido.liga_id);
        return;
      });
  }

  getEquipoLocal(id: number) {
    this.equiposService.getEquipo(id)
      .subscribe(equipo => {
        this.equipoLocal = equipo;
      });
  }

  getEquipoVisitante(id: number) {
    this.equiposService.getEquipo(id)
      .subscribe(equipo => {
        this.equipoVisitante = equipo;
      });
  }

  getTemporada(id: number) {
    this.temporadasService.getTemporada(id)
      .subscribe(temporada => {
        this.temporada = temporada;
      });
  }

  getLiga(id: number) {
    this.ligasService.getLiga(id)
      .subscribe(liga => {
        this.liga = liga;
      });
  }

  goEquipo(id: number) {
    this.router.navigate(['/equipos', id]);
  }
}
