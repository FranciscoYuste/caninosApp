import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import { Location } from '@angular/common';
import Jugador from '../../interfaz/jugador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-jugadores',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './eliminar-jugadores.component.html',
  styleUrls: ['./eliminar-jugadores.component.css'] // Asegúrate de que sea 'styleUrls' y no 'styleUrl'
})
export class EliminarJugadorComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugadorId?: string; // Propiedad para almacenar el ID del jugador seleccionado
  jugadorSeleccionado?: Jugador; // Propiedad para almacenar el jugador seleccionado

  constructor(private futbolService: FutbolService, private location: Location) {}

  ngOnInit() {
    this.cargarJugadores(); // Cargar la lista de jugadores al inicializar el componente
  }

  cargarJugadores() {
    this.futbolService.getJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }

  onJugadorSelect() {
    if (this.jugadorId) {
      this.jugadorSeleccionado = this.jugadores.find(jugador => jugador.id === this.jugadorId);
    } else {
      this.jugadorSeleccionado = undefined; // Resetear si no hay ID
    }
  }

  eliminarJugador() {
    if (this.jugadorId) {
      this.futbolService.deleteJugador(this.jugadorId).then(() => {
        console.log('Jugador eliminado con éxito');
        this.location.back();
      }).catch(error => {
        console.error('Error al eliminar el jugador: ', error);
      });
    } else {
      console.error('Por favor, ingrese un ID de jugador válido.');
    }
  }
}