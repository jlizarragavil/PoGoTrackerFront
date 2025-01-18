import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://pogotrackerback.onrender.com/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  constructor(private http: HttpClient) { }
  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
    this.loggedInSubject.next(true);
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  isUserLoggedIn(): boolean {
    return this.getUsername() !== null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
  clearUsername(): void {
    sessionStorage.removeItem('username');
    this.loggedInSubject.next(false); 
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login?username=${username}&password=${password}`, null, { responseType: 'text' });
  }

  logout(): void {
    this.clearUsername();
  }
  register(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, { username, password }, { responseType: 'text' });
  }
}
