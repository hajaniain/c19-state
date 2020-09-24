import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() set date(value: string) {
    this.dateFormControl.setValue(value);
  }

  @Output() changeDate: EventEmitter<string> = new EventEmitter();

  dateFormControl: FormControl = new FormControl('');

  minDate: Date;
  maxDate: Date;

  constructor() {}

  ngOnInit(): void {}

  setMinMaxDate(): void {
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);

    this.minDate = new Date(2020, 2, 1);
    this.maxDate = new Date(yesterday);
  }

  selectDate(event): void {
    const date = this.formatDate(event.value);
    this.changeDate.emit(date);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ];
    return `${year}-${this.prefixZero(month)}-${this.prefixZero(day)}`;
  }

  private prefixZero(num: number): string {
    return num.toString().length === 1 ? `0${num}` : num.toString();
  }
}
