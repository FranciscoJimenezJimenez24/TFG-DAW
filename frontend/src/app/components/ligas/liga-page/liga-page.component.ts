import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LigasService } from '../../../services/ligas.service';
import { Router } from '@angular/router';
import { Liga } from '../../../interfaces/liga';
import { EquiposService } from '../../../services/equipos.service';
import { Equipo } from '../../../interfaces/equipo';

@Component({
  selector: 'app-liga-page',
  standalone: true,
  imports: [],
  templateUrl: './liga-page.component.html',
  styleUrl: './liga-page.component.css'
})
export class LigaPageComponent implements OnInit {

  liga: Liga | null = null;
  equipos: Equipo[] = [];

  constructor(private activatedRoute: ActivatedRoute,private ligasService: LigasService, private router: Router, private equiposService: EquiposService) { }

  ngOnInit():void{
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.ligasService.getLiga(id))
      )
      .subscribe(liga=>{
        if (!liga) return this.router.navigate(['/ligas']);
        this.liga=liga;
        
        return;
      })
    this.getEquiposLiga();
  }

  getEquiposLiga(){
    if (!this.liga) return;
    this.equiposService.getEquiposLigas(this.liga.id)
      .subscribe(equipos=>{
        console.log(equipos);
        this.equipos=equipos;
        
      });
  }
}
