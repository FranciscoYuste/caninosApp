import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  // Estado inicial en "down"
  animationState = 'down';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // Busca el video utilizando ElementRef
    const video = this.el.nativeElement.querySelector('#introVideo') as HTMLVideoElement;

    if (video) {
      // Escucha el evento `ended` del video
      this.renderer.listen(video, 'ended', () => {
        video.pause(); // Pausa el video
        video.currentTime = video.duration; // Congela en la última imagen
      });
    }
  }

  onEnter() {
    this.router.navigate(['/equipos']); // Navega a la ruta de Equipos
  }

  openAdminLogin() {
    const dialogRef = this.dialog.open(AdminLoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Redirige al área de administración
        this.router.navigate(['/validarLoginAdmin']); // Navega a la ruta de Administración
        console.log('Acceso concedido a la sección de admin');
      }
    });
  }
}
