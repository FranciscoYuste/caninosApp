import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-admin',
  standalone: true,
  imports: [],
  templateUrl: './gestion-admin.component.html',
  styleUrl: './gestion-admin.component.css'
})
export class GestionAdminComponent {
  
  constructor(private router: Router) {}

  anadirPartidos() {
    this.router.navigate(['/añadirPartidos']);
  }

  anadirEq() {
    this.router.navigate(['/añadirEquipos']);
  }

  anadirJugadores() {
    this.router.navigate(['/añadirJugadores']);
  }

  editarPartidos() {
    this.router.navigate(['/editarPartidos']);
  }

  editarClasificacion() {
    this.router.navigate(['/editarClasificacion']);
  }

  editarDatosJugadores() {
    this.router.navigate(['/editarDatosJugadores']);
  }

  borrarPartidos() {
    this.router.navigate(['/borrarPartidos']);
  }

  borrarEq() {
    this.router.navigate(['/borrarEquipos']);
  }

  borrarJugadores() {
    this.router.navigate(['/borrarJugadores']);
  }

  modificarPartidos() {
    this.router.navigate(['/modificarPartidos']);
  }

  modificarEq() { 
    this.router.navigate(['/modificarEquipos']);
  }

  modificarJugadores() {
    this.router.navigate(['/modificarJugadores']);
  }
}
