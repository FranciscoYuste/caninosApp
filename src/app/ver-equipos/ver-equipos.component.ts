import { Component, OnInit } from '@angular/core';
import { FutbolService} from '../service/futbol.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import Equipo  from '../../interfaz/equipo';
import { Router } from '@angular/router';
import { VerPartidosComponent } from '../ver-partidos/ver-partidos.component';
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
  selector: 'app-ver-equipos',
  standalone: true,
  templateUrl: './ver-equipos.component.html',
  styleUrls: ['./ver-equipos.component.css'],
  imports: [CommonModule, VerPartidosComponent]
})

export class VerEquiposComponent implements OnInit {

  equipos: Equipo[] = [];

  constructor(private futbolService: FutbolService, private router: Router) {}

  ngOnInit(): void {
    this.futbolService.getEquipos().subscribe((equipos) => {
      this.equipos = equipos;
      this.ordenarEquipos(); // Ordena los equipos después de recibirlos
      console.log(equipos);
    });
  }

  ordenarEquipos() {
    this.equipos.sort((a, b) => {
        // Primero compara los puntos
        if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos; // Ordena de mayor a menor
        }
        // Si los puntos son iguales, compara la diferencia de goles
        if (b.diferenciaGoles !== a.diferenciaGoles) {
            return b.diferenciaGoles - a.diferenciaGoles; // Ordena de mayor a menor
        }
        // Si la diferencia de goles también es igual, compara los goles a favor
        return b.golesFavor - a.golesFavor; // Ordena de mayor a menor
    });
}

  
  verJugadores() {
    this.router.navigate(['/jugadores']); // Navega a la ruta de jugadores
  }
}
