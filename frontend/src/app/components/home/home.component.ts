import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth } from '../../shared/models/auth.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/AppState'
import * as AuthActions from '../../core/store/auth/auth.action'
import * as moment from 'moment';
import * as AttendanceActions from '../../core/store/attendance/attendance.action'
import { MatDialog } from '@angular/material/dialog';
import { DetectorComponent } from '../../mini-components/detector/detector.component'
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: any;
  isChecking: boolean;
  userSubscription: Subscription;
  attendances: any;
  _date: any;
  formData: FormGroup;
  formData$: Subscription | undefined;

  attendancesSubscription: Subscription;
  constructor(private _store: Store<AppState>, private _fb: FormBuilder, public dialog: MatDialog) {
    this.userSubscription = _store.select('auth').subscribe((data: Auth) => {
      this.auth = data.details;
    });
    this.attendancesSubscription = _store.select('attendance').subscribe((data: any) => {
      this.attendances = data.details;
    });
    this.formData = this._fb.group({
      date: [new Date(), Validators.compose([Validators.required])],
    });
    this.isChecking = false
  }
  ngOnInit(): void {
    this.onChangeDate(new Date())
    this.formData$ = this.formData.valueChanges.subscribe((data) => {
      this.onChangeDate(data.date)
    });
  }
  logout(): void {
    this._store.dispatch(new AuthActions.AuthLogOut());
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  addAttendance() {
    this.dialog.open(DetectorComponent);
  }
  onChangeDate(date_: any) {
    let date = moment(date_).format("YYYY-MM-DD")
    this._store.dispatch(new AttendanceActions.GetAttendance(date));
  }
}
