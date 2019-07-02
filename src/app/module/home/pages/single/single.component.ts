import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute} from '@angular/router';
import {DiscountNumberComponent} from '../../components/discount-number/discount-number.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  @ViewChild('discountChild') discountChild: DiscountNumberComponent;
  data: any = {
    gallery: []
  };
  loading = false;
  loading_save = false;
  cover: any = null;
  count: any = 1;
  variation: any = [];
  number_items: any = false;
  selectedvariationName: any;
  idparam: any;

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private route: ActivatedRoute) {
    this.util.refreshShopping.subscribe(data => {
      if (data) {
        this.loading_save = false;
      }
    });
    util.numberShopping.subscribe(data => {
      if (data) {
        this.number_items = data;
        console.log('--', data);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idparam = params['id'].toString();
        this.loadData(this.idparam);
      }
    });
  }

  changeCover = (a) => this.cover = a;

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/products/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          console.log('--->', response['data']['variations']);
          this.data = response.data;
          this.variation = response['data']['variations']['item'];
          this.selectedvariationName = response['data']['variations']['item'][0];
          this.cover = (response['data']['gallery'] && response['data']['gallery'].length)
            ? response['data']['gallery'][0] : null;
        }
      });
  };

  changeVariation = () => this.discountChild.init();

  addProduct = (obj) => {
    this.loading_save = true;
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.addCart(_data);
  };
}
