import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-attributes',
  templateUrl: './filter-attributes.component.html',
  styleUrls: ['./filter-attributes.component.css']
})
export class FilterAttributesComponent implements OnInit {
  @Input() filters: any = [];
  @Output() callback: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  selectOption = (a) => this.callback.emit(a);

}
