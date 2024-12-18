import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import { CommonModule } from '@angular/common';
import Partido from '../../interfaz/partido';

@Component({
  selector: 'app-ver-partidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-partidos.component.html',
  styleUrls: ['./ver-partidos.component.css']
})
export class VerPartidosComponent implements OnInit {
  partidos: Partido[] = []; // Lista de todos los partidos
  partidosPorJornada: { [jornada: string]: Partido[] } = {}; // Partidos agrupados por jornada
  partidosCaninosPorJornada: { [jornada: string]: Partido[] } = {}; // Partidos caninos agrupados por jornada
  jornadaAbierta: string | null = null; // Controla qué jornada está abierta

  constructor(private futbolService: FutbolService) {}

  ngOnInit(): void {
    this.futbolService.getPartidos().subscribe((partidos) => {
      this.partidos = partidos.map(partido => ({ ...partido }));

      // Organizar los partidos por jornadas
      this.partidos.forEach(partido => {
        // Partidos generales
        if (!this.partidosPorJornada[partido.jornada]) {
          this.partidosPorJornada[partido.jornada] = [];
        }
        this.partidosPorJornada[partido.jornada].push(partido);

        // Partidos Caninos
        if (partido.esCanino) {
          if (!this.partidosCaninosPorJornada[partido.jornada]) {
            this.partidosCaninosPorJornada[partido.jornada] = [];
          }
          this.partidosCaninosPorJornada[partido.jornada].push(partido);
        }
      });
    });
  }

  // Método para alternar la jornada abierta
  toggleJornada(jornada: string): void {
    this.jornadaAbierta = this.jornadaAbierta === jornada ? null : jornada;
  }

  // Método para alternar la visibilidad de los detalles
  toggleDetalles(partido: Partido): void {
    partido.mostrarDetalles = !partido.mostrarDetalles;
  }
}
