export interface Partido {
    id: number;
    temporada_id:number;
    liga_id:number;
    equipo_local_id:number;
    equipo_visitante_id:number;
    goles_local:number;
    goles_visitante:number;
    fecha:Date;
}
