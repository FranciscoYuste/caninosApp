import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import Equipo from '../../interfaz/equipo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eliminar-equipos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './eliminar-equipos.component.html',
  styleUrl: './eliminar-equipos.component.css'
})
export class EliminarEquiposComponent implements OnInit {
  equipos: Equipo[] = [];
  equipoId?: string; // Propiedad para almacenar el ID del equipo seleccionado
  equipoSeleccionado?: Equipo; // Propiedad para almacenar el equipo seleccionado

  constructor(private futbolService: FutbolService, private location: Location) {}

  ngOnInit() {
    this.cargarEquipos(); // Cargar la lista de equipos al inicializar el componente
  }

  cargarEquipos() {
    this.futbolService.getEquipos().subscribe((data: Equipo[]) => {
      this.equipos = data;
    });
  }

  onEquipoSelect() {
    if (this.equipoId) {
      this.equipoSeleccionado = this.equipos.find(equipo => equipo.id === this.equipoId);
    } else {
      this.equipoSeleccionado = undefined; // Resetear si no hay ID
    }
  }

  eliminarEquipo() {
    if (this.equipoId) {
      this.futbolService.deleteEquipo(this.equipoId).then(() => {
        console.log('Equipo eliminado con éxito');
        this.location.back();
      }).catch(error => {
        console.error('Error al eliminar el equipo: ', error);
      });
    } else {
      console.error('Por favor, ingrese un ID de equipo válido.');
    }
  }
}
