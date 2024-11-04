import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Partido from '../../interfaz/partido';
import { CommonModule } from '@angular/common';
import Equipo from '../../interfaz/equipo';
import { FutbolService } from '../service/futbol.service';
import Jugador from '../../interfaz/jugador';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent {
  partidoForm: FormGroup;
  equipos: Equipo[] = [];
  jugadores: Jugador[] = [];
  mensaje: string = '';
  mensajeVisible: boolean = false;

  constructor(private fb: FormBuilder, private futbolService: FutbolService) {
    this.partidoForm = this.fb.group({
      jornada: [null, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required],
      equipoCasa: ['', Validators.required],
      golesCasa: [0, [Validators.required, Validators.min(0)]],
      equipoVisitante: ['', Validators.required],
      golesVisitante: [0, [Validators.required, Validators.min(0)]],
      esCanino: [false],
      actuaciones: this.fb.array([]),
      convocatoria: this.fb.array([])
    });
  }

  ngOnInit() {
    this.futbolService.getEquipos().subscribe((equipos) => {
      this.equipos = equipos;
    });

    this.futbolService.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores;
    });
  }

  crearPartido() {
    if (this.partidoForm.valid) {
      const { equipoCasa, equipoVisitante } = this.partidoForm.value;
      const casa = this.equipos.find(e => e.nombre === equipoCasa);
      const visitante = this.equipos.find(e => e.nombre === equipoVisitante);

      if (casa && visitante) {
        const nuevoPartido: Partido = {
          ...this.partidoForm.value,
          equipoCasa: casa.id,
          equipoVisitante: visitante.id,
          nombreEquipoCasa: casa.nombre, // Guardar nombre del equipo casa
          nombreEquipoVisitante: visitante.nombre // Guardar nombre del equipo visitante
        };

        this.futbolService.addPartidos(nuevoPartido).then(() => {
          this.mensaje = 'Partido creado exitosamente';
          this.mostrarMensaje();
          this.actualizarEstadisticasEquipos(nuevoPartido);
          this.actualizarEstadisticasJugadores(nuevoPartido);
          this.partidoForm.reset();
        }).catch(error => {
          console.error('Error al crear el partido:', error);
          this.mensaje = 'El partido no se pudo crear: ' + error.message;
          this.mostrarMensaje();
        });
      } else {
        console.error('Uno de los equipos no se encontró:', equipoCasa, equipoVisitante);
        this.mensaje = 'Uno de los equipos no se encontró. Asegúrate de que los nombres sean correctos.';
        this.mostrarMensaje();
      }
    } else {
      console.error('Formulario inválido');
      this.mensaje = 'El formulario es inválido. Por favor revisa los datos.';
      this.mostrarMensaje();
    }
  }

  private actualizarEstadisticasEquipos(nuevoPartido: Partido) {
    const { golesCasa, golesVisitante } = nuevoPartido;
    const casa = this.equipos.find(e => e.id === nuevoPartido.equipoCasa);
    const visitante = this.equipos.find(e => e.id === nuevoPartido.equipoVisitante);

    if (casa && visitante) {
      casa.partidos++;
      visitante.partidos++;

      if (golesCasa > golesVisitante) {
        casa.ganados++;
        visitante.perdidos++;
        casa.puntos += 3;
      } else if (golesCasa < golesVisitante) {
        visitante.ganados++;
        casa.perdidos++;
        visitante.puntos += 3;
      } else {
        casa.empatados++;
        visitante.empatados++;
        casa.puntos++;
        visitante.puntos++;
      }

      casa.golesFavor += golesCasa;
      casa.golesContra += golesVisitante;
      casa.diferenciaGoles = casa.golesFavor - casa.golesContra;

      visitante.golesFavor += golesVisitante;
      visitante.golesContra += golesCasa;
      visitante.diferenciaGoles = visitante.golesFavor - visitante.golesContra;

      this.futbolService.updateEquipo(casa);
      this.futbolService.updateEquipo(visitante);
    } else {
      console.error('Uno de los equipos no se encontró:', nuevoPartido.equipoCasa, nuevoPartido.equipoVisitante);
    }
  }

  private actualizarEstadisticasJugadores(nuevoPartido: Partido) {
    if (!nuevoPartido.esCanino) return;

    nuevoPartido.actuaciones.forEach(actuacion => {
      const jugador = this.jugadores.find(j => j.nombre === actuacion.nombre);
      if (jugador) {
        jugador.goles += actuacion.goles;
        jugador.asistencias += actuacion.asistencias;
        this.futbolService.updateJugador(jugador);
      }
    });
  }

  addActuacion() {
    const actuacionesArray = this.partidoForm.get('actuaciones') as FormArray;
    const nuevaActuacion = this.fb.group({
      nombre: ['', Validators.required],
      goles: [0, [Validators.required, Validators.min(0)]],
      asistencias: [0, [Validators.required, Validators.min(0)]],
    });
    actuacionesArray.push(nuevaActuacion);
  }

  addConvocado() {
    const convocatoriaArray = this.partidoForm.get('convocatoria') as FormArray;
    const nuevoConvocado = this.fb.group({
      nombre: ['', Validators.required],
    });
    convocatoriaArray.push(nuevoConvocado);
  }

  get actuaciones(): FormArray {
    return this.partidoForm.get('actuaciones') as FormArray;
  }

  get convocatoria(): FormArray {
    return this.partidoForm.get('convocatoria') as FormArray;
  }

  mostrarMensaje() {
    this.mensajeVisible = true;
    setTimeout(() => this.mensajeVisible = false, 5000);
  }

  onEquipoSelected() {
    const equipoSeleccionadoCasa = this.partidoForm.get('equipoCasa')?.value;
    const equipoSeleccionadoVisitante = this.partidoForm.get('equipoVisitante')?.value;

    // Marca el checkbox si el equipo seleccionado es "Caninos"
    this.partidoForm.patchValue({
      esCanino: equipoSeleccionadoCasa === 'Caninos' || equipoSeleccionadoVisitante === 'Caninos'
    });
  }
}
