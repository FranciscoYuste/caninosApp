import { Component, OnInit } from '@angular/core';
import Equipo from '../../interfaz/equipo';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FutbolService } from '../service/futbol.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-equipos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-equipos.component.html',
  styleUrl: './modificar-equipos.component.css'
})
export class ModificarEquiposComponent implements OnInit {
  equipos: Equipo[] = [];
  formularioEquipo: FormGroup;
  equipoId?: string;
  equipoSeleccionado?: Equipo;
  mensaje: string = ''; // Para almacenar el mensaje de estado
  mensajeVisible: boolean = false; // Para controlar la visibilidad del mensaje


  constructor(private futbolService: FutbolService, private location: Location) {
    this.formularioEquipo = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      partidos: new FormControl(''),
      ganados: new FormControl(''),
      empatados: new FormControl(''),
      perdidos: new FormControl(''),
      golesFavor: new FormControl(''),
      golesContra: new FormControl(''),
      diferenciaGoles: new FormControl(''),
      puntos: new FormControl('')
    });
  }

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.futbolService.getEquipos().subscribe((data: Equipo[]) => {
        this.equipos = data;
    });
}

  onEquipoSelect(event: Event) {
    console.log('Equipo seleccionado'); // Agrega esto para depuración
    const selectElement = event.target as HTMLSelectElement;
    const equipoId = selectElement.value;

    this.equipoSeleccionado = this.equipos.find(equipo => equipo.id === equipoId);

    if (this.equipoSeleccionado) {
        this.equipoId = this.equipoSeleccionado.id; // Asigna el ID
        this.formularioEquipo.patchValue(this.equipoSeleccionado); // Carga los datos del equipo seleccionado al formulario
    } else {
        console.error('Equipo no encontrado:', equipoId); // Log para depuración
    }
}

  mostrarMensaje() {
    this.mensajeVisible = true;
    console.log('Mensaje mostrado:', this.mensaje); // Agrega esto para verificar
    setTimeout(() => {
        this.mensajeVisible = false; // Ocultar el mensaje después de 5 segundos
    }, 3000);
  }

  modificarEquipo() {
    if (this.formularioEquipo.valid) { // Verifica si el formulario es válido
      if (!this.equipoId) {
        console.error('ID del equipo no proporcionado.');
        this.mensaje = 'ID del equipo no proporcionado.'; // Mensaje informativo
        this.mostrarMensaje();
        return;
      }

      const equipoModificado: Equipo = {
        ...this.formularioEquipo.value,
        id: this.equipoId // Asegúrate de que el ID se esté pasando
      };

      this.futbolService.updateEquipo(equipoModificado).then(() => {
        console.log('Equipo modificado con éxito');
        this.mensaje = 'Equipo modificado con éxito'; // Mensaje de éxito
        this.mostrarMensaje();
        this.cargarEquipos(); // Actualiza la lista de equipos
        this.formularioEquipo.reset(); // Resetea el formulario
        this.equipoId = undefined; // Limpia el ID del equipo seleccionado
        this.location.back();
      }).catch(error => {
        console.error('Error al modificar el equipo: ', error);
        this.mensaje = 'Error al modificar el equipo: ' + error.message; // Mensaje de error
        this.mostrarMensaje();
      });
    } else {
      console.error('Formulario inválido');
      this.mensaje = 'El formulario es inválido. Por favor revisa los datos.'; // Mensaje de error por formulario inválido
      this.mostrarMensaje();
    }
  }

}
