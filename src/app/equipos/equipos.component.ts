import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FutbolService } from '../service/futbol.service';
import { CommonModule } from '@angular/common';
import Equipo from '../../interfaz/equipo';

@Component({
  selector: 'app-equipos',
  standalone: true,
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EquiposComponent implements OnInit {
  formularioEquipos: FormGroup;
  mensaje: string = '';
  mensajeVisible: boolean = false;

  constructor(private futbolService: FutbolService) {
    this.formularioEquipos = new FormGroup({
      nombre: new FormControl('', Validators.required),
      partidos: new FormControl(),
      ganados: new FormControl(),
      empatados: new FormControl(),
      perdidos: new FormControl(),
      golesFavor: new FormControl(),
      golesContra: new FormControl(),
      diferenciaGoles: new FormControl(),
      puntos: new FormControl(),
    });
  }

  ngOnInit() {
    // Inicializa datos o lógica adicional si es necesario
  }

  mostrarMensaje() {
    this.mensajeVisible = true;
    setTimeout(() => {
      this.mensajeVisible = false; // Oculta el mensaje después de 5 segundos
    }, 5000);
  }

  async onSubmit() {
    const equipo: Equipo = {
      nombre: this.formularioEquipos.value.nombre,
      partidos: this.formularioEquipos.value.partidos || 0,
      ganados: this.formularioEquipos.value.ganados || 0,
      empatados: this.formularioEquipos.value.empatados || 0,
      perdidos: this.formularioEquipos.value.perdidos || 0,
      golesFavor: this.formularioEquipos.value.golesFavor || 0,
      golesContra: this.formularioEquipos.value.golesContra || 0,
      diferenciaGoles: this.formularioEquipos.value.diferenciaGoles || 0,
      puntos: this.formularioEquipos.value.puntos || 0,
    };

    if (this.formularioEquipos.valid) {
      try {
        await this.futbolService.addEquipo(equipo); // Añade el equipo
        this.mensaje = 'Equipo creado exitosamente';
        this.mostrarMensaje();
        this.formularioEquipos.reset(); // Reinicia el formulario
      } catch (error) {
        this.mensaje = 'Error al crear el equipo: ';
        this.mostrarMensaje();
      }
    } else {
      this.mensaje = 'El equipo no se pudo crear, asegúrate de que todos los campos estén llenos.';
      this.mostrarMensaje();
    }
  }
}

