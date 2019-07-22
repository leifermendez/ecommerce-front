import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../../../../shared/services/util.service';

@Component({
  selector: 'app-data-categories-product',
  templateUrl: './data-categories-product.component.html',
  styleUrls: ['./data-categories-product.component.css']
})
export class DataCategoriesProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  @Input() data: any = {};
  public loading = false;
  public form: any = FormGroup;
  public loading_save = false;
  public editform: any = {};
  public select_categories: any = [];
  public categories: any = [];
  public categories_multiple: any = false;

  constructor(private fb: FormBuilder, private rest: RestService,
              private router: Router, private utils: UtilsService) {
  }

  ngOnInit() {
    this.getCategories();
    this.select_categories = (this.categories_multiple) ? this.data['categories'] : this.data['categories'][0];
  }

  save_categories = () => {
    this.loading_save = true;
    this.rest.post('/rest/product-category', {
      'category_id': (this.categories_multiple) ?
        this.select_categories.map(a => a.id) : this.select_categories['id'],
      'product_id': this.id
    })
      .then((response: any) => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          this.callback.emit(response['data']);
          this.utils.openSnackBar('Actualizado', 'success');
          this.router.navigateByUrl(`/products/edit/${this.id}/gallery`);
        }
      }).catch(err => {
      this.loading = false;
      this.utils.openSnackBar(err.error.msg, 'error');
    });
  };

  emitPreview = () => {

    const _this = this;
    setTimeout(function(){
      _this.utils.previewP.emit({categories:_this.select_categories});
      console.log(_this.select_categories)
    }, 200);
  }

  getCategories = () => {
    this.rest.get('/rest/categories?limit=100&filters=categories.child,<>,null')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.categories = response['data'];
          this.utils.previewP.emit({categories:this.select_categories});
        }
      });
  };
}
