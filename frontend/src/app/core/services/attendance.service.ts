import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient,private _globalService: GlobalService) { }

  addNew(data:any): Observable<any> {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const url = `${this._globalService.env.API_URL}/attendance/`;
    return this.http.post(url, data); 
  }
  
  getAttendances(date:any): Observable<any> {
    const url = `${this._globalService.env.API_URL}/attendances/`;
    return this.http.get(url, {params:{date:date}}); 
  }
}
