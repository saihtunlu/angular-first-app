// Section 1 Imports
import { Action } from '@ngrx/store'

// Section 2 Actions types
export const enum STAFF_TYPES {
    ADD_NEW   = '[STAFF] ADD',
    ADD_FAIL  = '[STAFF] ADD FAIL',
    ADD_NEW_SUCCESS='[STAFF] ADD SUCCESS',
    GET_STAFF='[STAFF] GET STAFF',
    GET_STAFF_SUCCESS='[STAFF] GET STAFF SUCCESS',
    GET_STAFF_FAIL='[STAFF] GET STAFF FAIL',

}

// Section 3 Actions
export class AddNew implements Action {
    readonly type = STAFF_TYPES.ADD_NEW
    constructor(public payload: any) {}
}
export class AddFail implements Action {
    readonly type = STAFF_TYPES.ADD_FAIL
    constructor(public payload: any) {}
}
export class AddSuccess implements Action {
    readonly type = STAFF_TYPES.ADD_NEW_SUCCESS
    constructor(public payload: any) {}
}


export class GetStaff implements Action {
    readonly type = STAFF_TYPES.GET_STAFF
    constructor() {}
}
export class GetStaffSuccess implements Action {
    readonly type = STAFF_TYPES.GET_STAFF_SUCCESS
    constructor(public payload: any) {}
}
export class GetStaffFail implements Action {
    readonly type = STAFF_TYPES.GET_STAFF_FAIL
    constructor(public payload: any) {}
}

// Section 4 Exports
export type Actions = AddNew | AddFail | AddSuccess | GetStaff | GetStaffFail|GetStaffSuccess