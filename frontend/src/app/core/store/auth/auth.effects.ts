import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action }  from '@ngrx/store'

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap,tap } from "rxjs/operators"

import * as authActions from './auth.action'
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

// services 
import {NotificationService} from "../../../core/services/notification.service"

@Injectable()
export class AuthEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _AuthService: AuthService,
        private _notification:NotificationService
    ) { }

    @Effect()
    login$: Observable<Action> = this._actions$.pipe(
      ofType<authActions.AuthLogin>(authActions.AUTH_TYPES.LOGIN),
      switchMap((action: authActions.AuthLogin) => {
        return this._AuthService.authLogin(action.payload.email, action.payload.password).pipe(
        switchMap((res: any) =>  {   
                this._AuthService.authSetToken(res.access,res.refresh);  
                new authActions.AuthLoginSuccess(res)
                let getAuth=new authActions.AuthByToken()
                if(getAuth){
                    this._router.navigateByUrl('/')
                }
                return of(getAuth)
            }),
            catchError((err: any) => {   
                this._notification.open(err,'error')
                return  of(new authActions.AuthLoginFail(err))
            })
            )
        })
    );

    @Effect()
    register$ : Observable<Action> = this._actions$.pipe(
        ofType<authActions.AuthRegister>( authActions.AUTH_TYPES.REGISTER),  
        switchMap((action: authActions.AuthRegister) => {
                return this._AuthService.authRegister(action.payload).pipe(
                    switchMap((res: any) =>  {   
                           let payload$:object={
                               email:action.payload.email,
                               password:action.payload.password
                           }
                           
                            return of(new authActions.AuthLogin(payload$))
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new authActions.AuthRegisterFail(err))
                        })
                    )
                }
        )
    );

    @Effect()       
    authByToken$ : Observable<Action> = this._actions$.pipe(
        ofType<authActions.AuthByToken>( authActions.AUTH_TYPES.AUTH_BY_TOKEN),  
        switchMap((action: authActions.AuthByToken) => {
                return this._AuthService.authGetUsersByToken().pipe(
                    switchMap((res: any) =>  {   
                            this._AuthService.authSetCurrentUser(res);        
                            return of(new authActions.AuthSetCurrentUser(res))                   
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new authActions.AuthLoginFail(err))
                        })
                    )
                }
        ),        
    );  


    @Effect({ dispatch: false })
    Logout: Observable<any> = this._actions$.pipe(
        ofType(authActions.AUTH_TYPES.LOGOUT),
        tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        new authActions.AuthLogOut()
        this._router.navigateByUrl('/login');
        })
    );

   

}