import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Partido, { ActuacionJugador, ConvocadoJugador } from '../../interfaz/partido';
import { FutbolService } from '../service/futbol.service';
import Jugador from '../../interfaz/jugador';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-partidos.component.html',
  styleUrls: ['./modificar-partidos.component.css'] 
})
export class ModificarPartidosComponent implements OnInit {
  partidos: Partido[] = [];
  formularioPartido: FormGroup;
  partidoId?: string;
  partidoSeleccionado?: Partido;
  jugadores: string[] = []; // Lista de jugadores
  mensaje: string = ''; // Para almacenar el mensaje de estado
  mensajeVisible: boolean = false; // Para controlar la visibilidad del mensaje

  constructor(private futbolService: FutbolService, private location: Location) {
    this.formularioPartido = new FormGroup({
      partido: new FormControl('', Validators.required), // Control para seleccionar partido
      jornada: new FormControl('', { validators: [Validators.required] }),
      fecha: new FormControl('', { validators: [Validators.required] }),
      equipoCasa: new FormControl('', { validators: [Validators.required] }),
      golesCasa: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
      equipoVisitante: new FormControl('', { validators: [Validators.required] }),
      golesVisitante: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
      actuaciones: new FormArray([]),
      convocatoria: new FormArray([]),
      esCanino: new FormControl(false),
    });
  }

  ngOnInit() {
    this.cargarPartidos();
    this.cargarJugadores();
  }

  cargarPartidos() {
    this.futbolService.getPartidos().subscribe((data: Partido[]) => {
      this.partidos = data;
    });
  }

  cargarJugadores() {
    this.futbolService.getJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = data.map(jugador => jugador.nombre); // Si solo necesitas el nombre
      },
      (error) => {
        console.error('Error cargando jugadores: ', error); // Manejo de errores
      }
    );
  }

  onPartidoSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const partidoId = selectElement.value;
  
    this.partidoSeleccionado = this.partidos.find(partido => partido.id === partidoId);
  
    if (this.partidoSeleccionado) {
      this.partidoId = this.partidoSeleccionado.id; 
      this.formularioPartido.patchValue({
        ...this.partidoSeleccionado,
        esCanino: this.partidoSeleccionado.equipoCasa === 'Caninos' || this.partidoSeleccionado.equipoVisitante === 'Caninos'
      }); 
      this.setActuaciones(this.partidoSeleccionado.actuaciones);
      this.setConvocatoria(this.partidoSeleccionado.convocatoria);
    }
  }

  setActuaciones(actuaciones: ActuacionJugador[]) {
    const actuacionesArray = this.formularioPartido.get('actuaciones') as FormArray;
    actuacionesArray.clear(); 
    actuaciones.forEach(actuacion => {
      actuacionesArray.push(this.createActuacionFormGroup(actuacion));
    });
  }

  createActuacionFormGroup(actuacion: ActuacionJugador): FormGroup {
    return new FormGroup({
      id: new FormControl(actuacion.id),
      nombre: new FormControl(actuacion.nombre, { validators: [Validators.required] }),
      goles: new FormControl(actuacion.goles, { validators: [Validators.required, Validators.min(0)] }),
      asistencias: new FormControl(actuacion.asistencias, { validators: [Validators.required, Validators.min(0)] }),
    });
  }

  setConvocatoria(convocatoria: ConvocadoJugador[]) {
    const convocatoriaArray = this.formularioPartido.get('convocatoria') as FormArray;
    convocatoriaArray.clear(); 
    convocatoria.forEach(jugador => {
      convocatoriaArray.push(this.createConvocadoFormGroup(jugador));
    });
  }

  createConvocadoFormGroup(jugador: ConvocadoJugador): FormGroup {
    return new FormGroup({
      nombre: new FormControl(jugador.nombre, { validators: [Validators.required] }),
    });
  }

  mostrarMensaje() {
    this.mensajeVisible = true;
    console.log('Mensaje mostrado:', this.mensaje); // Agrega esto para verificar
    setTimeout(() => {
        this.mensajeVisible = false; // Ocultar el mensaje después de 5 segundos
    }, 3000);
  }
  modificarPartido() {
    if (this.formularioPartido.valid) { // Verifica si el formulario es válido
        if (!this.partidoId) {
            console.error('ID del partido no proporcionado.');
            this.mensaje = 'ID del partido no proporcionado.'; // Mensaje informativo
            this.mostrarMensaje();
            return;
        }

        const partidoModificado: Partido = {
            ...this.formularioPartido.value,
            id: this.partidoId 
        };

        this.futbolService.updatePartido(partidoModificado).then(() => {
            console.log('Partido modificado con éxito');
            this.mensaje = 'Partido modificado con éxito'; // Mensaje de éxito
            this.mostrarMensaje();
            this.formularioPartido.reset(); // Resetea el formulario
            this.partidoId = undefined; // Limpia el ID del partido seleccionado
            this.cargarPartidos(); // Recarga los partidos
            this.location.back();
        }).catch(error => {
            console.error('Error al modificar el partido: ', error);
            this.mensaje = 'Error al modificar el partido: ' + error.message; // Mensaje de error
            this.mostrarMensaje();
        });
    } else {
        console.error('Formulario inválido');
        this.mensaje = 'El formulario es inválido. Por favor revisa los datos.'; // Mensaje de error por formulario inválido
        this.mostrarMensaje();
    }
  }

  addActuacion() {
    const actuacionesArray = this.formularioPartido.get('actuaciones') as FormArray;
    actuacionesArray.push(this.createActuacionFormGroup({ id: '', nombre: '', goles: 0, asistencias: 0 }));
  }

  removeActuacion(index: number) {
    const actuacionesArray = this.formularioPartido.get('actuaciones') as FormArray;
    actuacionesArray.removeAt(index);
  }

  addConvocado() {
    const convocatoriaArray = this.formularioPartido.get('convocatoria') as FormArray;
    convocatoriaArray.push(this.createConvocadoFormGroup({ nombre: '' }));
  }

  removeConvocado(index: number) {
    const convocatoriaArray = this.formularioPartido.get('convocatoria') as FormArray;
    convocatoriaArray.removeAt(index);
  }

  // Métodos para acceder a los FormArray
  get actuaciones(): FormArray {
    return this.formularioPartido.get('actuaciones') as FormArray;
  }

  get convocatoria(): FormArray {
    return this.formularioPartido.get('convocatoria') as FormArray;
  }
}
