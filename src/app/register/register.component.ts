import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Usar el operador de afirmación no nulo

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;

      this.authService.register(username, password).subscribe(
        response => {
          console.log('Respuesta de la API:', response);
          if (response.trim() === 'User registered successfully') {
            console.log('Registro exitoso');
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully' });
            this.router.navigate(['/login']);
          } else {
            console.error('Registro fallido');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed' });
          }
        },
        error => {
          console.error('Error en el registro:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed' });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
