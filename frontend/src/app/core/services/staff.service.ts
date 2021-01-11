import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient,private _globalService: GlobalService) { }

  addNew(data:any): Observable<any> {
    const url = `${this._globalService.env.API_URL}/staff/`;
    return this.http.post(url, data); 
  }
  
  getStaffs(): Observable<any> {
    const url = `${this._globalService.env.API_URL}/staffs/`;
    return this.http.get(url); 
  }
}
