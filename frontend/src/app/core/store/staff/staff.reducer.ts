import { Staff } from '../../../shared/models/staff.model';
import * as staffActions from './staff.action';
  
const INITIAL_STATE: Staff = {
    details:[],
    isAdded:false,
    isLoading:false,
    errorMessage:null
}

export function staffReducer(state: Staff = INITIAL_STATE, action: any) {
   switch(action.type) {
    case staffActions.STAFF_TYPES.ADD_NEW:
        return {
            ...state,
            isLoading: true,
        };
    case staffActions.STAFF_TYPES.ADD_NEW_SUCCESS:
        return {
            ...state,
            isAdded:true,
            details:[...state.details,action.payload],
            isLoading:false,
        };
    case staffActions.STAFF_TYPES.ADD_FAIL: {    
        return {
            ...state,
            isAdded: false,
            error_message: action.payload,
            isLoading:false
        };
    }

    case staffActions.STAFF_TYPES.GET_STAFF:
        return {
            ...state,
            isLoading: true,
        };
    case staffActions.STAFF_TYPES.GET_STAFF_SUCCESS:
        return {
            ...state,
            isAdded:true,
            details:action.payload,
            isLoading:false,
        };
    case staffActions.STAFF_TYPES.GET_STAFF_FAIL: {    
        return {
            ...state,
            details:[],
            error_message: action.payload,
            isLoading:false
        };
    }

    default: 
        return  state
    }   
}
