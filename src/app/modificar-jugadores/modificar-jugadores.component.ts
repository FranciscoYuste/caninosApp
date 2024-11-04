import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Jugador from '../../interfaz/jugador';
import { FutbolService } from '../service/futbol.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-jugadores',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-jugadores.component.html',
  styleUrls: ['./modificar-jugadores.component.css']
})

export class ModificarJugadoresComponent implements OnInit {
  jugadores: Jugador[] = [];
  formularioJugador: FormGroup;
  jugadorId?: string;
  jugadorSeleccionado?: Jugador;
  mensaje: string = ''; // Para almacenar el mensaje de estado
  mensajeVisible: boolean = false; // Para controlar la visibilidad del mensaje


  constructor(private futbolService: FutbolService, private location: Location) {
    this.formularioJugador = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required) ,
      dorsal: new FormControl(''),
      goles: new FormControl(''),
      asistencias: new FormControl(''),
      foto: new FormControl('')
    });
  }

  ngOnInit() {
    this.cargarJugadores();
  }

  cargarJugadores() {
    this.futbolService.getJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }

  onJugadorSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const jugadorId = selectElement.value;

    this.jugadorSeleccionado = this.jugadores.find(jugador => jugador.id === jugadorId);

    if (this.jugadorSeleccionado) {
      this.jugadorId = this.jugadorSeleccionado.id; // Asigna el ID
      this.formularioJugador.patchValue(this.jugadorSeleccionado); // Carga los datos del jugador seleccionado al formulario
    }
  }

  mostrarMensaje() {
    this.mensajeVisible = true;
    console.log('Mensaje mostrado:', this.mensaje); // Agrega esto para verificar
    setTimeout(() => {
        this.mensajeVisible = false; // Ocultar el mensaje después de 5 segundos
    }, 3000);
  }

  modificarJugador() {
    if (this.formularioJugador.valid) { // Verifica si el formulario es válido
      if (!this.jugadorId) {
        console.error('ID del jugador no proporcionado.');
        this.mensaje = 'ID del jugador no proporcionado.'; // Mensaje informativo
        this.mostrarMensaje();
        return;
      }

      const jugadorModificado: Jugador = {
        ...this.formularioJugador.value,
        id: this.jugadorId // Asegúrate de que el ID se esté pasando
      };

      this.futbolService.updateJugador(jugadorModificado).then(() => {
        console.log('Jugador modificado con éxito');
        this.mensaje = 'Jugador modificado con éxito'; // Mensaje de éxito
        this.mostrarMensaje();
        this.cargarJugadores(); // Actualiza la lista de jugadores
        this.formularioJugador.reset(); // Resetea el formulario
        this.jugadorId = undefined; // Limpia el ID del jugador seleccionado
        this.location.back();
      }).catch(error => {
        console.error('Error al modificar el jugador: ', error);
        this.mensaje = 'Error al modificar el jugador: ' + error.message; // Mensaje de error
        this.mostrarMensaje();
      });
    } else {
      console.error('Formulario inválido');
      this.mensaje = 'El formulario es inválido. Por favor revisa los datos.'; // Mensaje de error por formulario inválido
      this.mostrarMensaje();
    }
  }
}