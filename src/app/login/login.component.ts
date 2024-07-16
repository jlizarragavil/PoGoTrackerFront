import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(username, password).subscribe(
        response => {
          console.log('Respuesta de la API:', response);
          if (response === 'Login successful') {
            console.log('Inicio de sesión exitoso');
            this.authService.setUsername(username);
            this.router.navigate(['/xp-tracker']); // Redirige a otra ruta después del inicio de sesión exitoso
          } else {
            console.error('Inicio de sesión fallido');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User/password incorrect' });
            // Manejar el inicio de sesión fallido (por ejemplo, mostrar un mensaje de error)
          }
        },
        error => {
          console.error('Error en el login:', error); // Maneja el error según tus necesidades
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User/password incorrect' });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}