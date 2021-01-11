import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action }  from '@ngrx/store'

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap,tap } from "rxjs/operators"

import * as attendanceActions from './attendance.action'
import { AttendanceService } from '../../services/attendance.service';
import { Router } from '@angular/router';

// services 
import {NotificationService} from "../../services/notification.service"

@Injectable()
export class AttendanceEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _AttendanceService: AttendanceService,
        private _notification:NotificationService
    ) { }

    @Effect()
    add_attendance$ : Observable<Action> = this._actions$.pipe(
        ofType<attendanceActions.AddNew>( attendanceActions.ATTENDANCE_TYPES.ADD_NEW),  
        map((action: attendanceActions.AddNew) => action.payload),
        switchMap((payload:any) => {
                return this._AttendanceService.addNew(payload).pipe(
                        map((res: any) =>  {   
                            this._notification.open("Adding attendance success",'success')
                            return  new attendanceActions.AddSuccess(res)
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new attendanceActions.AddFail(err))
                        })
                    )
                }
        )
    );

    @Effect()
    get_attendances$ : Observable<Action> = this._actions$.pipe(
        ofType<attendanceActions.GetAttendance>( attendanceActions.ATTENDANCE_TYPES.GET_ATTENDANCE),  
        map((action: attendanceActions.GetAttendance) => action.payload),
        switchMap((payload:any) => {
                return this._AttendanceService.getAttendances(payload).pipe(
                        map((res: any) =>  {   
                            console.log("🚀 ~ file: attendance.effects.ts ~ line 51 ~ AttendanceEffects ~ map ~ res", res)
                            return  new attendanceActions.GetAttendanceSuccess(res)
                        }),
                        catchError((err: any) => {   
                            this._notification.open(err,'error')
                            return  of(new attendanceActions.GetAttendanceFail(err))
                        })
                    )
                }
        )
    );
}