import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-attributes',
  templateUrl: './filter-attributes.component.html',
  styleUrls: ['./filter-attributes.component.css']
})
export class FilterAttributesComponent implements OnInit {
  @Input() filters: any = [];
  @Input() loading = false;
  @Output() callbackCategory: EventEmitter<any> = new EventEmitter();
  @Output() callbackAttr: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectOption = (a) => this.callbackCategory.emit(a);

  selectAttr = (a) => this.callbackAttr.emit(a);
}
