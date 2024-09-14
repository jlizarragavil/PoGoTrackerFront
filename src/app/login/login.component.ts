import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
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
          if (response.trim() === 'Login successful') {
            console.log('Inicio de sesión exitoso');
            this.authService.setUsername(username);
            this.router.navigate(['/xp-tracker']);
          } else {
            console.error('Inicio de sesión fallido');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username/Password incorrect' });
          }
        },
        error => {
          console.error('Error en el login:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username/Password incorrect' });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
