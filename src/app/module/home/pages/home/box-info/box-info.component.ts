import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-box-info',
  templateUrl: './box-info.component.html',
  styleUrls: ['./box-info.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class BoxInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
