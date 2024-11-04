import { Component, OnInit } from '@angular/core';
import Partido from '../../interfaz/partido';
import { FutbolService } from '../service/futbol.service';
import { Location } from '@angular/common'; // Para navegar hacia atrás con el botón de retroceso
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-partidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './eliminar-partidos.component.html',
  styleUrl: './eliminar-partidos.component.css'
})
export class EliminarPartidosComponent implements OnInit {
  partidos: Partido[] = []; // Almacena la lista de partidos
  partidoId?: string; // Almacena el ID del partido seleccionado
  partidoSeleccionado?: Partido; // Almacena el partido seleccionado

  constructor(private futbolService: FutbolService, private location: Location) {}

  ngOnInit() {
    this.cargarPartidos(); // Cargar la lista de partidos al inicializar el componente
  }

  cargarPartidos() {
    this.futbolService.getPartidos().subscribe((data: Partido[]) => {
      this.partidos = data; // Asignar los partidos a la propiedad
    });
  }

  onPartidoSelect() {
    if (this.partidoId) {
      this.partidoSeleccionado = this.partidos.find(partido => partido.id === this.partidoId);
    } else {
      this.partidoSeleccionado = undefined; // Resetear si no hay ID
    }
  }

  eliminarPartido() {
    if (this.partidoId) {
      this.futbolService.deletePartido(this.partidoId).then(() => {
        console.log('Partido eliminado con éxito');
        this.location.back();
      }).catch(error => {
        console.error('Error al eliminar el partido: ', error);
      });
    } else {
      console.error('Por favor, ingrese un ID de partido válido.');
    }
  }
}
