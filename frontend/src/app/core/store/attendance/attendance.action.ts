// Section 1 Imports
import { Action } from '@ngrx/store'

// Section 2 Actions types
export const enum ATTENDANCE_TYPES {
    ADD_NEW   = '[ATTENDANCE] ADD',
    ADD_FAIL  = '[ATTENDANCE] ADD FAIL',
    ADD_NEW_SUCCESS='[ATTENDANCE] ADD SUCCESS',
    GET_ATTENDANCE='[ATTENDANCE] GET',
    GET_ATTENDANCE_SUCCESS='[ATTENDANCE] GET SUCCESS',
    GET_ATTENDANCE_FAIL='[ATTENDANCE] GET FAIL',

}

// Section 3 Actions
export class AddNew implements Action {
    readonly type = ATTENDANCE_TYPES.ADD_NEW
    constructor(public payload: any) {}
}
export class AddFail implements Action {
    readonly type = ATTENDANCE_TYPES.ADD_FAIL
    constructor(public payload: any) {}
}
export class AddSuccess implements Action {
    readonly type = ATTENDANCE_TYPES.ADD_NEW_SUCCESS
    constructor(public payload: any) {}
}


export class GetAttendance implements Action {
    readonly type = ATTENDANCE_TYPES.GET_ATTENDANCE
    constructor(public payload: any) {}
}
export class GetAttendanceSuccess implements Action {
    readonly type = ATTENDANCE_TYPES.GET_ATTENDANCE_SUCCESS
    constructor(public payload: any) {}
}
export class GetAttendanceFail implements Action {
    readonly type = ATTENDANCE_TYPES.GET_ATTENDANCE_FAIL
    constructor(public payload: any) {}
}

// Section 4 Exports
export type Actions = AddNew | AddFail | AddSuccess | GetAttendance | GetAttendanceFail|GetAttendanceSuccess