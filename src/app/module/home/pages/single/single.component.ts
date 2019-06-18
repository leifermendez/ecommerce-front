import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  data: any = [];
  loading = false;
  count: any = 1;
  variation: any = [];

  selectedvariationName: any;
  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent) { }

  ngOnInit() {
    this.loadData();
  }
  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/products/6`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.variation = response.data.variations.item;
          this.selectedvariationName = response.data.variation.item[0];
        }
      });
  }
  pluscount() {
    this.count = this.count + 1;
  }
  dismis () {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }
  addProduct = (obj) => {
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.addCart(_data);
  }
}
