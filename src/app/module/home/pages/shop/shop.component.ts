import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public cif_flag: any = null;
  public data_shops: any = true;
  public data_inside: any = {}

  constructor(private router: Router) {
  }

  cif_callback = (e) => {
    this.cif_flag = e;
    this.data_inside['legal_id'] = e;
  }

  data_shops_callback = (e) => {
    this.data_shops = (e.length);
    if(!this.data_shops){
      this.router.navigateByUrl('/shop/create');
    }
  }


  ngOnInit() {
  }

}
