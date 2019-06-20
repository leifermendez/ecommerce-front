import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';

@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.component.html',
  styleUrls: ['./data-product.component.css']
})
export class DataProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public loading = false;
  public form: any = FormGroup;
  public editform: any = {};
  public list_shops: any = [];
  public select_shop: any = null;

  constructor(private fb: FormBuilder, private rest: RestService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'short_description': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getShops();
  }

  getShops = () => {
    this.rest.get('/rest/shop?limit=50')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.list_shops = response['data'];
          if (this.list_shops && this.list_shops.length) {
            this.select_shop = this.list_shops[0];
          }
        }
      });
  };

  save = () => {
    this.editform = {
      ...this.editform,
      ...{shop_id: (this.select_shop) ? this.select_shop['id'] : null}
    };

    this.rest.post('/rest/products', this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.callback.emit(response['data']);
        }
      });
  };
}
