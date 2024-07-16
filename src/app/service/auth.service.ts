import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) { }

  // Guardar el nombre de usuario en sessionStorage
  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
  }

  // Obtener el nombre de usuario desde sessionStorage
  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  // Limpiar el nombre de usuario de sessionStorage
  clearUsername(): void {
    sessionStorage.removeItem('username');
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login?username=${username}&password=${password}`, null, { responseType: 'text' });
  }
}
