import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inside-filter-nav',
  templateUrl: './inside-filter-nav.component.html',
  styleUrls: ['./inside-filter-nav.component.css']
})
export class InsideFilterNavComponent implements OnInit {
  @Input() placeholder: any = '';
  constructor() { }

  ngOnInit() {
  }

}
