import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab-day',
  templateUrl: './tab-day.component.html',
  styleUrls: ['./tab-day.component.css']
})
export class TabDayComponent implements OnInit {
  @Input() day: any = '';
  @Input() hours: any = [];
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  addSchedule = () => {
    this.hours[this.day][2] = null;
    this.hours[this.day][3] = null;
  };

  closeSchedule = () => {
    this.hours[this.day].splice(2, 3);
  };

}
