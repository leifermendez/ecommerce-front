import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {AuthshopService} from '../../../auth/authshop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public from: any = 'user';
  public data_shops: any = [];
  public loading = false;
  public user_data: any = null;

  constructor(private rest: RestService,
              private util: UtilsService,
              private auth: AuthshopService) {

  }

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.loadDataShop();
    // this.loadData();
  }

  loadDataShop = () => {
    this.loading = true;
    this.rest.get(`/rest/shop?limit=50&filters=shops.users_id,=,${this.user_data['id']}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data_shops = response['data']['data'];

        }
      });
  };

}
