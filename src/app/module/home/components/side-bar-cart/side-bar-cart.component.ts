import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-bar-cart',
  templateUrl: './side-bar-cart.component.html',
  styleUrls: ['./side-bar-cart.component.css']
})
export class SideBarCartComponent implements OnInit {
  @Input() step: any = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
