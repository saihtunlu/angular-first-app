// Section 1 Imports
import { Action } from '@ngrx/store'

// Section 2 Actions types
export const enum AUTH_TYPES {
    LOGIN   = '[LOGIN] Do',
    LOGIN_SUCCESS   = '[LOGIN] Success',
    LOGIN_FAIL = '[LOGIN] Fail',
    REGISTER   = '[REGISTER] Do',
    REGISTER_SUCCESS   = '[REGISTER] Success',
    REGISTER_FAIL = '[REGISTER] Fail',
    LOGOUT = '[LOGOUT] Logout',
    SET_CURRENT_USER = '[SET_CURRENT_USER] Set current user',
    AUTH_BY_TOKEN = '[AUTH] Auth by token'
  }

// Section 3 Actions
export class AuthLogOut implements Action {
    readonly type = AUTH_TYPES.LOGOUT
    constructor() {}
}

export class AuthLogin implements Action {
    readonly type = AUTH_TYPES.LOGIN
    constructor(public payload: any) {}
}
 
export class AuthLoginSuccess implements Action {
    readonly type = AUTH_TYPES.LOGIN_SUCCESS;  
    constructor(public payload: any) {}
}

export class AuthLoginFail implements Action {
    readonly type = AUTH_TYPES.LOGIN_FAIL;
    constructor(public payload: any) {}
}


export class AuthRegister implements Action {
    readonly type = AUTH_TYPES.REGISTER
    constructor(public payload: any) {}
}
 
export class AuthRegisterSuccess implements Action {
    readonly type = AUTH_TYPES.REGISTER_SUCCESS;  
    constructor(public payload: any) {}
}

export class AuthRegisterFail implements Action {
    readonly type = AUTH_TYPES.REGISTER_FAIL;
    constructor(public payload: any) {}
}


export class AuthSetCurrentUser implements Action {
    readonly type = AUTH_TYPES.SET_CURRENT_USER
    constructor(public payload: any) {}
}

export class AuthByToken implements Action {
    readonly type = AUTH_TYPES.AUTH_BY_TOKEN
    constructor() { }
}

// Section 4 Exports
export type Actions = AuthLogin | AuthLoginFail | AuthLoginSuccess | AuthSetCurrentUser | AuthByToken |AuthLogOut