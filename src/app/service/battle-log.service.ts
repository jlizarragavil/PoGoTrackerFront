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

  getBattleStats(id: string, league: string, subLeague?: string, season?: any): Observable<any> {
    let url = `${this.apiUrl}/${id}/stats?league=${league}`;
    if (subLeague) {
      url += `&subLeague=${subLeague}`;
    }
    if (season) {
      url += `&season=${season}`;
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
  deleteBattleLogEntry(id: string, date: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/battles`, {
      body: { date: date }
    });
  }

  updateBattleLog(id: string, battleLog: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/battles`, battleLog);
  }
}
