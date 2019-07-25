import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ListProductStoreComponent} from '../store/listproduct/listproduct.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-page-category',
  templateUrl: './search-page-category.component.html',
  styleUrls: ['./search-page-category.component.css']
})
export class SearchPageCategoryComponent implements OnInit {
  public loading = false;
  public filters: any = [];
  public data: any = [];
  public meta_key: any = [];
  public id: any = null;
  public src: any = null;
  public queryParams: any = {
    limit: 1,
    all_filters: 'all',
    pagination: 'all'
  };

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private list: ListProductStoreComponent,
              private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {

    const [id] = this.route.snapshot.params.id.split('-');
    this.id = id.toString();
    this.route.queryParams.subscribe(params => {
      this.queryParams = {...this.queryParams, ...params};
      this.loadData(this.id);
    });
  }

///product_categories.category_id,=,${id}
  setVariable = (a) => this.filters = a;

  loadData = (id) => {
    this.loading = true;
    this.queryParams = {...this.queryParams, ...{filters: `product_categories.category_id,=,${id}`}};
    this.rest.get(`/rest/search`, this.queryParams)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.filters = this.data['filter'];
        }
      });
  };

}
