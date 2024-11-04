import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import { CommonModule } from '@angular/common';
import Partido from '../../interfaz/partido';

@Component({
  selector: 'app-ver-partidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-partidos.component.html',
  styleUrls: ['./ver-partidos.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class VerPartidosComponent implements OnInit {

  partidos: Partido[] = []; // Inicializa como un array vacío
  partidosPorJornada: { [jornada: string]: Partido[] } = {}; // Para agrupar partidos por jornada
  partidosCaninos: Partido[] = []; // Array para los partidos caninos
  jornadaAbierta: string | null = null; // Variable para controlar la jornada abierta

  constructor(private futbolService: FutbolService) { }

  ngOnInit(): void {
    this.futbolService.getPartidos().subscribe((partidos) => {
      this.partidos = partidos.map(partido => ({ ...partido }));

      // Agrupar los partidos por jornada y separar los caninos
      this.partidos.forEach(partido => {
        if (partido.esCanino) {
          this.partidosCaninos.push(partido);
        }

        if (!this.partidosPorJornada[partido.jornada]) {
          this.partidosPorJornada[partido.jornada] = [];
        }
        this.partidosPorJornada[partido.jornada].push(partido);
      });

      console.log(this.partidosPorJornada);
    });
  }

  toggleJornada(jornada: string) {
    this.jornadaAbierta = this.jornadaAbierta === jornada ? null : jornada; // Alternar la jornada abierta
  }

  // Método para alternar la visibilidad de los detalles
  toggleDetalles(partido: Partido & { mostrarDetalles?: boolean }) {
    partido.mostrarDetalles = !partido.mostrarDetalles; // Cambiar el estado de mostrarDetalles
  }

  // Método para alternar la visibilidad de los detalles
  toggleDetalles2(partido: Partido & { mostrarDetalles?: boolean }) {
    partido.mostrarDetalles = !partido.mostrarDetalles; // Cambiar el estado de mostrarDetalles
  }
}