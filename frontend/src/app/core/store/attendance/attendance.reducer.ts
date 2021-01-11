import { Attendance } from '../../../shared/models/attendance.model';
import * as attendanceActions from './attendance.action';

const INITIAL_STATE: Attendance = {
    details: [],
    isAdded: false,
    isLoading: false,
    errorMessage: null
}

export function attendanceReducer(state: Attendance = INITIAL_STATE, action: any) {
    switch (action.type) {
        case attendanceActions.ATTENDANCE_TYPES.ADD_NEW:
            return {
                ...state,
                isAdded: false,
                isLoading: true,
            };
        case attendanceActions.ATTENDANCE_TYPES.ADD_NEW_SUCCESS:
            return {
                ...state,
                isAdded: true,
                details: [...state.details, action.payload],
                isLoading: false,
            };
        case attendanceActions.ATTENDANCE_TYPES.ADD_FAIL: {
            return {
                ...state,
                isAdded: false,
                error_message: action.payload,
                isLoading: false
            };
        }

        case attendanceActions.ATTENDANCE_TYPES.GET_ATTENDANCE:
            return {
                ...state,
                isLoading: true,
            };
        case attendanceActions.ATTENDANCE_TYPES.GET_ATTENDANCE_SUCCESS:
            return {
                ...state,
                isAdded: true,
                details: action.payload,
                isLoading: false,
            };
        case attendanceActions.ATTENDANCE_TYPES.GET_ATTENDANCE_FAIL: {
            return {
                ...state,
                details: [],
                error_message: action.payload,
                isLoading: false
            };
        }

        default:
            return state
    }
}
