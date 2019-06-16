import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../../../shared/services/rest.service';
import * as moment from 'moment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public cif_flag: any = null;
  public data_shops: any = [];
  public data_inside: any = {}
  public loading = false;
  public rangeDate: any;

  constructor(private router: Router,
    private rest: RestService) {
  }

  cif_callback = (e) => {
    this.cif_flag = e;
    this.data_inside['legal_id'] = e;
  }

  /*data_shops_callback = (e) => {
    this.data_shops = (e.length);
    if(!this.data_shops){
      this.router.navigateByUrl('/shop/create');
    }
  }*/

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shop`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data_shops = response['data']['data'];
        }
      });
  };

  ngOnInit() {
    const _start = moment().toDate();
    const _finish = moment().add(15, 'days');
    this.rangeDate = {
      startDate: _start,
      endDate: _finish
    };
    this.loadData();
  }

}
