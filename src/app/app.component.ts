import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: any[] = [];
  isLoggedIn: boolean = false; // Estado de autenticación

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Nos suscribimos al estado de autenticación
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.setupMenu(); // Actualizamos el menú cada vez que cambia el estado de autenticación
    });

    this.setupMenu(); // Inicializamos el menú
  }

  setupMenu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/'])
      },
      {
        label: 'xpTracker',
        icon: 'pi pi-chart-bar',
        command: () => this.router.navigate(['/xp-tracker'])
      },
      {
        label: 'Catching calculator',
        icon: 'pi pi-calculator',
        command: () => this.router.navigate(['/catching-calculator'])
      },
      {
        label: 'GBL Attaks counter',
        icon: 'pi pi-table',
        command: () => this.router.navigate(['/gbl'])
      },
      {
        label: 'GBL Game',
        icon: 'pi pi-table',
        command: () => this.router.navigate(['/gbl-game'])
      },
      {
        label: 'Battle log',
        icon: 'pi pi-table',
        command: () => this.router.navigate(['/battle-log'])
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['/contact'])
      }
    ];

    // No agregamos el botón de login/logout aquí
}

  // Método para manejar el click en Login o Logout
  handleAuthAction() {
    if (this.isLoggedIn) {
      // Si el usuario está logueado, cerramos la sesión
      this.authService.logout();
      this.router.navigate(['/login']); // Redirige a la página de login
    } else {
      // Si el usuario no está logueado, redirigimos a la página de login
      this.router.navigate(['/login']);
    }
  }
}
