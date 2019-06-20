import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';

@Component({
  selector: 'app-data-categories-product',
  templateUrl: './data-categories-product.component.html',
  styleUrls: ['./data-categories-product.component.css']
})
export class DataCategoriesProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  public loading = false;
  public form: any = FormGroup;
  public editform: any = {};
  public select_categories: any = [];
  public categories: any = [];

  constructor(private fb: FormBuilder, private rest: RestService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  save_categories = () => {

    this.rest.post('/rest/product-category', {
      'category_id': this.select_categories.map(a => a.id),
      'product_id': this.id
    })
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.callback.emit(response['data']);
        }
      });
  };


  getCategories = () => {
    this.rest.get('/rest/categories?limit=50')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.categories = response['data'];
        }
      });
  };
}
