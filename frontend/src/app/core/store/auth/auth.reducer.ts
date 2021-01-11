import { Auth } from './../../../shared/models/auth.model';
import * as AuthActions from './auth.action';
  
const INITIAL_STATE: Auth = {
    details:{
        first_name:'',
        last_name:''
    },
    isLoggedIn:false,
    isLoading:false,
    errorMessage:null
}


export function authReducer(state: Auth = INITIAL_STATE, action: any) {
   switch(action.type) {
    case AuthActions.AUTH_TYPES.REGISTER:
        return {
            ...state,
            isLoading: true,
        };
    case AuthActions.AUTH_TYPES.REGISTER_SUCCESS: {       
        return {
            ...state,
            isLoggedIn: true,
            isLoading:false
        };
    }
    case AuthActions.AUTH_TYPES.REGISTER_FAIL: {    
        return {
            ...state,
            isLoggedIn: false,
            error_message: action.payload,
            isLoading:false
        };
    }
    case AuthActions.AUTH_TYPES.LOGIN:
        return {
            ...state,
            isLoading: true,
        };
    case AuthActions.AUTH_TYPES.LOGIN_SUCCESS: {       
        return {
            ...state,
            isLoggedIn: true,
            isLoading:false
        };
    } 
    case AuthActions.AUTH_TYPES.LOGIN_FAIL: {    
        return {
            ...state,
            isLoggedIn: false,
            error_message: action.payload,
            isLoading:false
        };
    }
    case AuthActions.AUTH_TYPES.LOGOUT: {       
        return {
            details:null,
            isLoggedIn:false,
            errorMessage:null,
            isLoading:false
        };
    }

    case AuthActions.AUTH_TYPES.SET_CURRENT_USER: {       
        return {
            ...state,
            isLoggedIn: true,
            details: action.payload,
            error_message: null
        };
    }
    default: 
        return  state
    }   
}
