import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class XpServiceService {

  private apiUrl = 'https://pogotrackerback.onrender.com/xpTracker';
  //private apiUrl = 'http://localhost:8080/xpTracker';

  constructor(private http: HttpClient) { }

  getXpRecords(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getXpRecordById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addXPRecord(id: string, totalXP: number, xpEvent: number, luckyEgg: string): Observable<any> {
    const url = `${this.apiUrl}/addXPRecord/${id}`;
    let lucky: boolean;
    if(luckyEgg == "yes"){
      lucky = true
    }else{
      lucky = false
    }
    const xpRecordBody ={
      totalXP: totalXP,
      xpEvent: xpEvent,
      luckyEgg: lucky
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
    return this.http.patch(url, xpRecordBody);
  }
}
