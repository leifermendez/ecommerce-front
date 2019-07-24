import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-attributes',
  templateUrl: './filter-attributes.component.html',
  styleUrls: ['./filter-attributes.component.css']
})
export class FilterAttributesComponent implements OnInit {
  @Input() filters: any = [];

  constructor() {
  }

  ngOnInit() {
  }

}
