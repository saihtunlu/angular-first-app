import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Staff } from '../../shared/models/staff.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/AppState'
import * as StaffAction from '../../core/store/staff/staff.action'

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffsData: any;
  count: number = 0;
  staffSubscription: Subscription;
  constructor(private _store: Store<AppState>) {
    this.staffSubscription = _store.select('staff').subscribe((data: any) => {
      this.staffsData = data;
    });
  }

  onChangeCount($event: any) {
    if ($event?.target?.value) {
      this.count = $event.target.value
    } else {
      this.count = $event
    }
  }
  ngOnInit(): void {

  }

}
