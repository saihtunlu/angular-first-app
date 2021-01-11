import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import {Auth} from './shared/models/auth.model';
import { Store} from '@ngrx/store';
import {AppState} from './core/store/AppState'
import * as AuthActions from './core/store/auth/auth.action'
import * as AttendanceActions from './core/store/attendance/attendance.action'
import * as StaffActions from './core/store/staff/staff.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean | undefined;
  userSubscription:Subscription;
  title = 'first-app';

  constructor(private _store: Store<AppState>) {
    this.userSubscription= _store.select('auth').subscribe((data:Auth) => {
        this.isLoggedIn = data.isLoggedIn;
      });
    }
  
  ngOnInit(): void {
    this._store.dispatch(new AuthActions.AuthByToken());
    this._store.dispatch(new StaffActions.GetStaff());
  }
}
