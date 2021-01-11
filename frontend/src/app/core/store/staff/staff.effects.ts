import { StaffService } from './../../services/staff.service';
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action }  from '@ngrx/store'
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap,tap } from "rxjs/operators"

import * as staffActions from './staff.action'
import { Router } from '@angular/router';

// services 
import {NotificationService} from "../../services/notification.service"

@Injectable()
export class StaffEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _StaffService: StaffService,
        private _notification:NotificationService
    ) { }

    @Effect()
    add_attendance$ : Observable<Action> = this._actions$.pipe(
        ofType<staffActions.AddNew>( staffActions.STAFF_TYPES.ADD_NEW),  
        map((action: staffActions.AddNew) => action.payload),
        switchMap((payload:any) => {
                return this._StaffService.addNew(payload).pipe(
                        map((res: any) =>  {   
                            this._notification.open("Adding staff success",'success')
                            return  new staffActions.AddSuccess(res)
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new staffActions.AddFail(err))
                        })
                    )
                }
        )
    );

    @Effect()
    get_Staffs$ : Observable<Action> = this._actions$.pipe(
        ofType<staffActions.GetStaff>( staffActions.STAFF_TYPES.GET_STAFF),  
        switchMap(() => {
                return this._StaffService.getStaffs().pipe(
                        map((res: any) =>  {   
                            console.log("🚀 ~ file: staff.effects.ts ~ line 49 ~ AttendanceEffects ~ map ~ res", res)
                            return  new staffActions.GetStaffSuccess(res)
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new staffActions.GetStaffFail(err))
                        })
                    )
                }
        )
    );
}