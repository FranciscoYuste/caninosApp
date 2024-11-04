import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import Jugador from '../../interfaz/jugador';
import { CommonModule } from '@angular/common'; // Importa CommonModule
@Component({
  selector: 'app-ver-jugadores',
  standalone: true,
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css'],
  imports: [CommonModule] // Asegúrate de incluir CommonModule aquí
})
export class VerJugadoresComponent implements OnInit {

  jugadores: Jugador[] = []; // Inicializa como un array vacío

  constructor(private futbolService: FutbolService) {}

  ngOnInit() {
    this.futbolService.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores; // Asigna los jugadores a la propiedad
      console.log(jugadores);
    });
  }
}