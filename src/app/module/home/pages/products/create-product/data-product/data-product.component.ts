import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {AuthshopService} from '../../../../../auth/authshop.service';
import {UtilsService} from '../../../../../../shared/services/util.service';

@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.component.html',
  styleUrls: ['./data-product.component.css']
})
export class DataProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  public loading = false;
  public loading_save = false;
  public form: any = FormGroup;
  public editform: any = {};
  public list_shops: any = [];
  public select_shop: any = null;
  public user_data: any;

  constructor(private fb: FormBuilder, private rest: RestService, private router: Router,
              private utils: UtilsService,
              private auth: AuthshopService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'short_description': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.getShops();
    if (this.id) {
      this.loadData();
    }
  }

  getShops = () => {
    this.loading = true;
    this.rest.get(`/rest/shop?limit=50&filters=shops.users_id,=,${this.user_data['id']}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.list_shops = response['data'];
          if (this.list_shops && this.list_shops.length) {
            this.select_shop = this.list_shops[0];
          }
        }
      });
  };

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/products/${this.id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform = {...this.editform, ...response['data']};
        }
      });
  };

  save = () => {
    this.loading_save = true;
    this.editform = {
      ...this.form.value,
      ...{shop_id: (this.select_shop) ? this.select_shop['id'] : null}
    };

    const _method = (this.id) ? 'put' : 'post';
    this.rest[_method](`/rest/products/${(this.id) ? this.id : ''}`, this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading_save = false;
          this.utils.openSnackBar('Producto agregado', 'success');
          this.callback.emit(response['data']);
          this.router.navigateByUrl(`/products/edit/${response['data']['id']}/categories`);
        }
      }).catch(err => {
      this.loading = false;
      this.loading_save = false;
      this.utils.openModalSnack(err.error.error, 'error');
    });
  };
}
