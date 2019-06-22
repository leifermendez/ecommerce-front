import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public from: any = 'user';
  public data_shops: any = [];
  public loading = false;

  constructor(private rest: RestService,
              private util: UtilsService) {

  }

  ngOnInit() {
    this.loadDataShop();
    // this.loadData();
  }

  loadDataShop = () => {
    this.loading = true;
    this.rest.get(`/rest/shop`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data_shops = response['data']['data'];

        }
      });
  };

}
