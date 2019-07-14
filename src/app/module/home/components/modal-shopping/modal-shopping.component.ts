import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { UtilsService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-modal-shopping',
  templateUrl: './modal-shopping.component.html',
  styleUrls: ['./modal-shopping.component.css']
})
export class ModalShoppingComponent implements OnInit {
  public data: any = {
    name: ''
  };
  public error: any = false;
  public loading_save = true;

  constructor(public bsModalRef: BsModalRef,
    private shopping: ShoppingCartComponent,
    private util: UtilsService) { }

  ngOnInit() {
    this.addProduct(this.data);
  }

  addProduct = (obj) => {
    this.loading_save = true;
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.add(_data)
      .then(response => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          this.util.refreshShopping.emit(response['data']);
        }
      })
      .catch(err => {
        this.loading_save = false;
        const msg = (err && err['error']) ? err['error'] : 'Debes iniciar session';
        this.error = msg;
      });
  };

}
