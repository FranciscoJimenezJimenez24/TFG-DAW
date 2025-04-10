import { Component } from '@angular/core';
import { LigasService } from '../../services/ligas.service';
import { Liga } from '../../interfaces/liga';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PartidosService } from '../../services/partidos.service';
import { Partido } from '../../interfaces/partido';
import { CardPartidoComponent } from '../cards/card-partido/card-partido.component';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../interfaces/equipo';
import { Temporada } from '../../interfaces/temporada';
import { TemporadasService } from '../../services/temporadas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule,CardPartidoComponent,RouterLink,FormsModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
export class PartidosComponent {
  listaLigas: Liga[] = [];
  partidos: Partido[] = [];
  partidosLigas: Record<number, Partido[]> = {};
  temporadas: Temporada[] = [];
  ligaPaginas: Record<number, number> = {};
  equiposCache: Record<number, Equipo> = {};
  selectedTemporadaId: number | null = null;

  constructor(
    private ligasService: LigasService,
    private partidosService: PartidosService,
    private equiposService: EquiposService,
    private temporadasService: TemporadasService) { }

  ngOnInit(): void {
    this.getLigas();
    this.getTemporadas();
  }

  onTemporadaChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const idTemporada = Number(selectedValue);
    if (!isNaN(idTemporada)) {
      this.selectedTemporadaId = idTemporada;
      this.cargarPartidosTemporada(idTemporada);
    }
  }

  getTemporadas(): void {
    this.temporadasService.getTemporadas().subscribe(temporadas => {
      this.temporadas = temporadas;
  
      if (this.temporadas.length > 0) {
        this.selectedTemporadaId = this.temporadas[0].id;
        this.cargarPartidosTemporada(this.selectedTemporadaId); // carga inicial
      }
    });
  }

  cargarPartidosTemporada(idTemporada: number): void {
    for (const liga of this.listaLigas) {
      const idLiga = liga.id;
      if (idLiga) {
        this.getPartidos(idTemporada, idLiga);
      }
    }
  }

  getLigas() {
    this.ligasService.getLigas().subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  getPartidos(idTemporada: number, idLiga: number): void {
    this.partidosService.getPartidosLigasTemporadas(idLiga, idTemporada)
      .subscribe(partidos => {
        const partidosOrdenados = partidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        this.partidosLigas[idLiga] = partidosOrdenados;
        this.ligaPaginas[idLiga] = 0;
  
        // Cargar todos los equipos involucrados en los partidos
        const equipoIds = new Set<number>();
        partidosOrdenados.forEach(partido => {
          equipoIds.add(partido.equipo_local_id);
          equipoIds.add(partido.equipo_visitante_id);
        });
  
        equipoIds.forEach(id => {
          if (!this.equiposCache[id]) {
            this.equiposService.getEquipo(id).subscribe(equipo => {
              this.equiposCache[id] = equipo;
            });
          }
        });
      });
  }
  

  getPartidosPaginados(idLiga: number): Partido[] {
    const pagina = this.ligaPaginas[idLiga] || 0;
    const todos = this.partidosLigas[idLiga] || [];
    const inicio = pagina * 5;
    return todos.slice(inicio, inicio + 5);
  }
  

  getEquipo(idEquipo: number): Equipo | null {
    if (this.equiposCache[idEquipo]) {
      return this.equiposCache[idEquipo];
    } else {
      this.equiposService.getEquipo(idEquipo).subscribe(equipo => {
        this.equiposCache[idEquipo] = equipo;
      });
      return null; // Mientras llega la respuesta, devuelve null (puedes manejarlo en el HTML)
    }
  }

  nextPage(idLiga: number): void {
    const total = this.partidosLigas[idLiga]?.length || 0;
    const currentPage = this.ligaPaginas[idLiga] || 0;
    if ((currentPage + 1) * 5 < total) {
      this.ligaPaginas[idLiga] = currentPage + 1;
    }
  }
  
  prevPage(idLiga: number): void {
    const currentPage = this.ligaPaginas[idLiga] || 0;
    if (currentPage > 0) {
      this.ligaPaginas[idLiga] = currentPage - 1;
    }
  }

  handleError(error: any): void {
    console.log(error);
  }

  handleResponse(data: any) {
    this.listaLigas = data;
  }
}
