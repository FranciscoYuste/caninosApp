import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { VerEquiposComponent } from './ver-equipos/ver-equipos.component';
import { GestionAdminComponent } from './gestion-admin/gestion-admin.component';
import { EquiposComponent } from './equipos/equipos.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { EliminarJugadorComponent } from './eliminar-jugadores/eliminar-jugadores.component';
import { EliminarEquiposComponent } from './eliminar-equipos/eliminar-equipos.component';
import { EliminarPartidosComponent } from './eliminar-partidos/eliminar-partidos.component';
import { PartidosComponent } from './partidos/partidos.component';
import { ModificarJugadoresComponent } from './modificar-jugadores/modificar-jugadores.component';
import { ModificarEquiposComponent } from './modificar-equipos/modificar-equipos.component';
import { ModificarPartidosComponent } from './modificar-partidos/modificar-partidos.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Ruta principal
  { path: 'jugadores', component: VerJugadoresComponent}, 
  { path: 'equipos', component: VerEquiposComponent }, 
  { path: 'validarLoginAdmin', component: AdminLoginComponent },
  { path: 'admin', component: GestionAdminComponent },
  { path: 'añadirPartidos', component: PartidosComponent },
  { path: 'añadirEquipos', component: EquiposComponent }, 
  { path: 'añadirJugadores', component: JugadoresComponent }, 
  { path: 'borrarJugadores', component: EliminarJugadorComponent }, 
  { path: 'borrarEquipos', component: EliminarEquiposComponent }, 
  { path: 'borrarPartidos', component: EliminarPartidosComponent },  
  { path: 'modificarJugadores', component: ModificarJugadoresComponent },
  { path: 'modificarEquipos', component: ModificarEquiposComponent },
  { path: 'modificarPartidos', component: ModificarPartidosComponent },
  { path: '**', redirectTo: 'welcome' } // Redirección a la página principal si la ruta no existe
];