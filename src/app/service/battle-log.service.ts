import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {
  private apiUrl = 'https://pogotrackerback.onrender.com/xpTracker';

  constructor(private http: HttpClient) {}

  getBattleLogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/battles`);
  }

  getBattleLogs(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/battles`);
  }

  addBattleLog(id: string, battleLog: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/battle-log`, battleLog);
  }

  updateBattleLog(id: string, battleLog: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/battles`, battleLog);
  }

  getBattleStats(id: string, league: string, subLeague?: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/stats?league=${league}`;
    if (subLeague) {
      return this.http.get<any>(`${url}&subLeague=${subLeague}`);
    }
    return this.http.get<any>(url);
  }

  getBattleLogsByDateRange(id: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/battles/date-range`, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });
  }

  resetBattleLogs(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/battles/reset`);
  }
}
