import { Attendance } from './../../shared/models/attendance.model';
import { Auth } from './../../shared/models/auth.model';
import { Staff } from './../../shared/models/staff.model';

//reducers
import { authReducer } from './auth/auth.reducer'
import { attendanceReducer } from './attendance/attendance.reducer'
import { staffReducer } from './staff/staff.reducer'

//effects
import { AuthEffects } from './auth/auth.effects';
import { AttendanceEffects } from './attendance/attendance.effects';
import { StaffEffects } from './staff/staff.effects';

export interface AppState {
    readonly auth: Auth;
    readonly staff:Staff;
    readonly attendance: Attendance;
}

export const AppReducers = {
    auth: authReducer,
    staff:staffReducer,
    attendance:attendanceReducer,
};
export const AppEffects = [AuthEffects,AttendanceEffects,StaffEffects]