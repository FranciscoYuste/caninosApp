export default interface Equipo {
    id?: string;
    nombre: string;
    partidos: number;
    ganados: number;
    empatados: number;
    perdidos: number;
    golesFavor: number;
    golesContra: number;
    diferenciaGoles: number;
    puntos: number;
  }