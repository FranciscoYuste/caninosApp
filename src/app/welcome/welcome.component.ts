import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'], // Cambia a styleUrls
})

export class WelcomeComponent {

    // Estado inicial en "down"
    animationState = 'down';

  constructor(private router: Router, private dialog: MatDialog) { }
  onEnter() {
    this.router.navigate(['/equipos']); // Navega a la ruta de Equipos
  }

  openAdminLogin() {
    const dialogRef = this.dialog.open(AdminLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes redirigir al área de administración
        this.router.navigate(['/validarLoginAdmin']); // Navega a la ruta de Administración
        console.log('Acceso concedido a la sección de admin');
      }
    });
  }
}
