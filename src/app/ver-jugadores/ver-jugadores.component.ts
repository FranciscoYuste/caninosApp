import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import Jugador from '../../interfaz/jugador';
import { CommonModule } from '@angular/common'; // Asegúrate de incluir CommonModule aquí

@Component({
  selector: 'app-ver-jugadores',
  standalone: true,
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css'],
  imports: [CommonModule]
})
export class VerJugadoresComponent implements OnInit {
  
  jugadores: Jugador[] = []; // Lista de jugadores
  indiceActual: number = 0;  // Índice del jugador actualmente seleccionado

  constructor(
    private futbolService: FutbolService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.futbolService.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores; // Asigna la lista de jugadores
      console.log(jugadores);
    });

    // Llama al método de reproducción en segundo plano después de que los jugadores estén disponibles
    this.reproducirVideo();
  }

  // Obtener el jugador actualmente seleccionado
  get jugadorSeleccionado(): Jugador {
    return this.jugadores[this.indiceActual];
  }

  // Función para cambiar al jugador anterior
  cambiarJugador(direccion: 'prev' | 'next') {
    if (direccion === 'prev') {
      this.indiceActual = (this.indiceActual - 1 + this.jugadores.length) % this.jugadores.length;
    } else {
      this.indiceActual = (this.indiceActual + 1) % this.jugadores.length;
    }

    // Reproducir el video nuevamente al cambiar de jugador
    this.reproducirVideo();
  }

  // Reproducir video y congelarlo cuando termine
  reproducirVideo() {
    // Encuentra el video utilizando ElementRef
    const video = this.el.nativeElement.querySelector('.video-fondo') as HTMLVideoElement;

    if (video) {
      video.currentTime = 0; // Reestablece el video al inicio

      // Escucha el evento 'ended' para congelar el video en la última imagen
      this.renderer.listen(video, 'ended', () => {
        video.pause(); // Pausa el video
        video.currentTime = video.duration; // Congela en la última imagen
      });
    }
  }

  // Cerrar modal (opcional si tienes un modal de detalles del jugador)
  cerrarModal() {
    this.indiceActual = 0; // Restablece el índice si es necesario
  }
}
