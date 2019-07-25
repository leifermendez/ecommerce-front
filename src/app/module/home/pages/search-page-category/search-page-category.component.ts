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
  public queryParams: any = {
    limit: 15,
    all_filters: 'all',
    filters: {},
    pagination: 'all'
  };


  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private list: ListProductStoreComponent,
              private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      const id = routeParams.id;
      this.route.queryParams.subscribe(params => {
        this.queryParams = {...this.queryParams, ...params};
        this.queryParams['filters'] = (params['filters']) ? params['filters'] : '';
        this.queryParams['attributes_filter'] = (params['attributes_filter']) ? params['attributes_filter'] : '';
        this.loadData(id);
      });
    });


  }

  setVariable = (a) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        filters: `product_categories.category_id,=,${a.id}`
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  };

  setAttribute = (a) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        attributes_filter: `att.value,=,${a.value}?att.attributes_id,=,${a.attr_id}`
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
    });
  };


  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/search`, {...this.queryParams, ...{filters: `product_categories.category_id,=,${id}`}})
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.filters = this.data['filter'];
        }
      });
  };

}
