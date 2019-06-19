import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public loading = false;
  public form: any = FormGroup;
  public editform: any = {};
  public categories: any = [];
  public select_categories: any = [];
  public list_shops: any = [];

  constructor(private fb: FormBuilder, private rest: RestService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'short_description': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
    });
  }

  getCategories = () => {
    this.rest.get('/rest/categories?limit=50')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.categories = response['data'];
        }
      });
  };

  getShops = () => {
    this.rest.get('/rest/shop?limit=50')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.list_shops = response['data'];
        }
      });
  };


  save = () => {

  };

  ngOnInit() {
    this.getShops();
    this.getCategories();
  }

}
