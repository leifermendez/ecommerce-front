import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() showMenu = true;
  public data = [1, 2, 3];
  loading = false;
  public total: any;
  public total_shop: any;

  constructor(private rest: RestService, private util: UtilsService) {
    this.util.refreshShopping.subscribe(data => {
      if (data) {
        this.loadData();
      }
    });

  }

  loadData = () => {
    this.loading = true;
    this.rest.get('/rest/shopping-cart')
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.total = response['data']['total'];
          this.total_shop = response['data']['total_shop'];
          this.data = response['data']['list'];
          this.util.numberShopping.emit(response['data']['list'].length);
        }
      }).catch((err) => {
      this.loading = false;
    });
  };

  addCart = (obj) => {

    this.loading = true;
    this.rest.post('/rest/shopping-cart', obj)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.util.refreshShopping.emit(response['data']);
        }
      }).catch((err) => {
      this.loading = false;
    });
  };

  ngOnInit() {
    this.loadData();
  }

}
