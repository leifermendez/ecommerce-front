import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import * as moment from 'moment';
import {AuthshopService} from '../../../auth/authshop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public data_shops: any = [];
  public loading = false;
  public rangeDate: any;
  public user_data: any;

  constructor(private router: Router,
              private rest: RestService,
              private auth: AuthshopService) {
  }

  /*data_shops_callback = (e) => {
    this.data_shops = (e.length);
    if(!this.data_shops){
      this.router.navigateByUrl('/shop/create');
    }
  }*/

  loadData = () => {
    this.user_data = this.auth.getCurrentUser();
    this.loading = true;
    this.rest.get(`/rest/shop?limit=50&filters=shops.users_id,=,${this.user_data['id']}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data_shops = response['data']['data'];
          if (!this.data_shops.length) {
            this.router.navigateByUrl('/shop/create');
          }
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
