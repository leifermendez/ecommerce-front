import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ListProductStoreComponent} from '../store/listproduct/listproduct.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public loading = false;
  public filters: any = [];
  public data: any = [];
  public meta_key: any = [];
  public src: any = null;
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

    // const src = this.route.snapshot.params.src;
    this.route.params.subscribe(routeParams => {
      const src = routeParams.src;
      this.route.queryParams.subscribe(params => {
        this.queryParams = {...this.queryParams, ...params};
        this.queryParams = {...this.queryParams, ...{src: (src) ? src : ''}};
        this.queryParams['filters'] = (params['filters']) ? params['filters'] : '';
        this.queryParams['attributes_filter'] = (params['attributes_filter']) ? params['attributes_filter'] : '';
        this.loadData();
      });
    })


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


  loadData = () => {
    this.loading = true;
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
