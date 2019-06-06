import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-zip-location',
  templateUrl: './zip-location.component.html',
  styleUrls: ['./zip-location.component.css']
})
export class ZipLocationComponent implements OnInit {
  public zip_code = null;

  constructor() {
  }

  ngOnInit() {
    console.log('hereee');
  }

}
