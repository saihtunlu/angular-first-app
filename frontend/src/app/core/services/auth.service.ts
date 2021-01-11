import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { retry,  map} from "rxjs/operators"
import {Auth} from '../../shared/models/auth.model'
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { GlobalService } from '../global.service';


@Injectable({
  providedIn: 'root' 
})

export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private _globalService: GlobalService) { }
  
  authGetToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    } else {
      return null
    }
  }

  isLoggedIn():boolean {
    if ( localStorage.getItem('access_token')) {
      return true;
    } else {
      return false
    }
  }

  authSetToken(access_token:any,refresh_token:any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
  }

  authLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
      return true
    } else {
      return false
    }
  }

  authSetCurrentUser(data:any) {    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('current_user', JSON.stringify(data))
      return data
    } else {
      return null
    }
  }

  authGetCurrentUser() {    
    if (isPlatformBrowser(this.platformId)) {
      const localItem = localStorage.getItem('current_user');
      if(localItem === null) {
        return false;
      } else {
        return JSON.parse(localItem)
      }
    } else {
      return false;
    }
  }

  authGetUsersByToken( ) {
    var url_token = `${this._globalService.env.API_URL}/auth/`;
    return this.http.get<any>(url_token).pipe(
      map((tokens) => {       
        return tokens
      }), retry(3))
  }

  authLogin(email: string, password: string): Observable<any> {
    const url = `${this._globalService.env.API_URL}/login/`;
    return this.http.post<Auth>(url, { email, password });
  }

  authRegister(payload:object): Observable<Auth> {
    const url = `${this._globalService.env.API_URL}/register/`;
    return this.http.post<Auth>(url, payload);
  }


}
