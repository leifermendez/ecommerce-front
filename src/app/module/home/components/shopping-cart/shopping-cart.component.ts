import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() showMenu = true;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  public data = [1, 2, 3];
  public loading = false;
  public total: any;
  public total_shop: any;

  constructor(private rest: RestService, private util: UtilsService) {
    this.util.refreshShopping.subscribe(data => {
      if (data) {
        this.loadData();
      }
    });
    this.util.removeItemShopping.subscribe(i => {
      if (i) {
        this.data.splice(i, 1);
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
          this.callback.emit(response['data']);
          this.util.refreshShoppingData.emit(response['data']);
          this.util.numberShopping.emit(response['data']['list'].length);
        }
      }).catch((err) => {
      this.loading = false;
    });
  };

  add = (r, _this = this) => new Promise(function (resolve, reject) {
    try {
      _this.rest.post('/rest/shopping-cart', r)
        .then((response: any) => {
          resolve(response);
        }).catch((err) => {
        reject((err && err['error']) ? err['error'] : err);
      });
    } catch (e) {
      reject(e);
    }
  });

  addCart = (obj) => {

    this.loading = true;
    this.add(obj)
      .then(response => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.util.refreshShopping.emit(response['data']);
        }
      }).catch(err => {
      this.loading = false;
      const msg = (err && err['error']) ? err['error'] : 'Debes iniciar session';
      this.util.openSnackBar(msg, 'error');
    });
  };

  ngOnInit() {
    this.loadData();
  }

}
