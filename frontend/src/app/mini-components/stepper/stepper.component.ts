import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor() { }

  @Input()
  value: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.value++;
    this.change.emit(this.value);
  }

  decrement() {
    this.value--;
    this.change.emit(this.value);
  }

  ngOnInit(): void {
  }
  ChangeValue($event: any) {
    this.change.emit(($event.target.value));
  }
}
