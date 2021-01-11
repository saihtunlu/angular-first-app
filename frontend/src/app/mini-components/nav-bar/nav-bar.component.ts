import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import {Auth} from '../../shared/models/auth.model';
import { Store} from '@ngrx/store';
import {AppState} from '../../core/store/AppState'
import * as AuthActions from '../../core/store/auth/auth.action'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  auth: any;
  userSubscription:Subscription;
  constructor(private _store: Store<AppState>) {
    this.userSubscription= _store.select('auth').subscribe((data:Auth) => {
        this.auth = data.details;
      });
    }

  ngOnInit(): void {
  }
  logout(): void {
    this._store.dispatch(new AuthActions.AuthLogOut());
  }
  ngOnDestroy()	{
    this.userSubscription.unsubscribe();
    console.log('Destroy nav-bar component!');
  }
}
