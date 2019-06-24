import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';
import {Router} from '@angular/router';

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
  public loading_save = false;
  public editform: any = {};
  public select_categories: any = [];
  public categories: any = [];

  constructor(private fb: FormBuilder, private rest: RestService,
    private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  save_categories = () => {
    this.loading_save = true;
    this.rest.post('/rest/product-category', {
      'category_id': this.select_categories.map(a => a.id),
      'product_id': this.id
    })
      .then((response: any) => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          this.callback.emit(response['data']);
          this.router.navigateByUrl(`/products/edit/${this.id}/gallery`);
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
