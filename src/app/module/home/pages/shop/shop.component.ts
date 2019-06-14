import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public cif_flag: any = null;

  constructor() {
  }

  cif_callback = (e) => this.cif_flag = e;

  ngOnInit() {
  }

}
