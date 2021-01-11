import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router,  CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(public router: Router,private _AuthService: AuthService) { }
  canActivate(): boolean{    
      if (this._AuthService.isLoggedIn()) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
  }
  
}
