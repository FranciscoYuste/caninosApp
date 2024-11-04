import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa ReactiveFormsModule
import { FutbolService } from '../service/futbol.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'], // Corrige 'styleUrl' a 'styleUrls'
  imports: [ReactiveFormsModule, CommonModule] // Asegúrate de incluir ReactiveFormsModule aquí
})
export class JugadoresComponent implements OnInit {

  formularioJugadores: FormGroup;
  mensaje: string = ''; // Para almacenar el mensaje de estado
  mensajeVisible: boolean = false; // Para controlar la visibilidad del mensaje

  constructor(private futbolService: FutbolService) { // Añade 'private' para inyectar el servicio
    this.formularioJugadores = new FormGroup({
      nombre: new FormControl('', Validators.required), // Añade un valor por defecto (vacío)
      dorsal: new FormControl('', Validators.required), // Añade un valor por defecto (vacío)
      goles: new FormControl(0), // Añade un valor por defecto (vacío)
      asistencias: new FormControl(0), // Añade un valor por defecto (vacío)
      foto: new FormControl('') // Añade un valor por defecto (vacío)
    });
  }

  ngOnInit() {
    // Puedes inicializar datos o lógica adicional aquí si es necesario
  }

  mostrarMensaje() {
    this.mensajeVisible = true;
    setTimeout(() => {
      this.mensajeVisible = false; // Ocultar el mensaje después de 5 segundos
    }, 5000);
  }

  async onSubmit() {
    if (this.formularioJugadores.valid) {
      const response = await this.futbolService.addJugador(this.formularioJugadores.value);
      this.mensaje = 'Jugador creado exitosamente';
      this.mostrarMensaje();
      this.formularioJugadores.reset();
    } else {
      this.mensaje = 'El jugador no se pudo crear, asegúrate de que todos los campos estén llenos.';
      this.mostrarMensaje();
    }
  }
}