import { Component } from '@angular/core';
import { FutbolService } from '../service/futbol.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminContrasena: string = '';
  error: string = '';
  

  constructor(private futbolService: FutbolService,
    private router: Router,
    private dialogRef: MatDialogRef<AdminLoginComponent>
  ) {}

  async login() {
    // Verifica que el campo de contraseña no esté vacío
    if (!this.adminContrasena) {
      this.error = 'Por favor, ingresa la contraseña.';
      return;
    }

    try {
      // Obtén la contraseña del servicio
      const adminPassword = await this.futbolService.getAdminPassword();

      // Compara la contraseña ingresada con la almacenada
      if (this.adminContrasena === adminPassword) {
        // Acceso concedido, redirige a la sección de admin
        this.error = '';
        this.dialogRef.close(); // Cierra el modal
        this.router.navigate(['/admin']); // Redirige a la sección de admin
      } else {
        this.error = 'Contraseña incorrecta. Inténtalo de nuevo.';
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener la contraseña del administrador:', error);
      this.error = 'Hubo un problema al intentar acceder. Inténtalo de nuevo más tarde.';
    }
  }
}