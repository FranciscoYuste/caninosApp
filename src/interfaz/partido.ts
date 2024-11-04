export interface ActuacionJugador {
  id?: string;
  nombre: string;
  goles: number;
  asistencias: number;
}

export interface ConvocadoJugador {
  nombre: string;
}

export default interface Partido {
  id?: string;
  jornada: string;
  fecha: string;
  equipoCasa: string;
  nombreEquipoCasa: string; // Nombre del equipo casa
  golesCasa: number;
  equipoVisitante: string;
  nombreEquipoVisitante: string; // Nombre del equipo visitante
  golesVisitante: number;
  actuaciones: ActuacionJugador[];  // Arreglo de actuaciones de jugadores
  convocatoria: ConvocadoJugador[]; // Arreglo de jugadores convocados
  esCanino: boolean; // PAra saber si es partido canino
  mostrarDetalles?: boolean; // Para controlar la visibilidad de los detalles del partido
}