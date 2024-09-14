import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://pogotrackerback.onrender.com/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn()); // El estado inicial se toma de sessionStorage

  constructor(private http: HttpClient) { }

  // Guardar el nombre de usuario en sessionStorage y notificar el cambio
  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
    this.loggedInSubject.next(true); // Notificamos que el usuario ha iniciado sesión
  }

  // Obtener el nombre de usuario desde sessionStorage
  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  // Verificar si el usuario está logueado
  isUserLoggedIn(): boolean {
    return this.getUsername() !== null;
  }

  // Obtener el estado de autenticación como observable
  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable(); // Exponemos el observable para que otros componentes puedan suscribirse
  }

  // Limpiar el nombre de usuario de sessionStorage y notificar el cambio
  clearUsername(): void {
    sessionStorage.removeItem('username');
    this.loggedInSubject.next(false); // Notificamos que el usuario ha cerrado sesión
  }

  // Método de inicio de sesión que retorna un observable con la respuesta del servidor
  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login?username=${username}&password=${password}`, null, { responseType: 'text' });
  }

  // Método de cierre de sesión
  logout(): void {
    this.clearUsername();
  }
  register(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, { username, password }, { responseType: 'text' });
  }
}
