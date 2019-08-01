import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ListProductStoreComponent} from '../store/listproduct/listproduct.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalFilterAttributesComponent} from '../../components/modal-filter-attributes/modal-filter-attributes.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-search-page-category',
  templateUrl: './search-page-category.component.html',
  styleUrls: ['./search-page-category.component.css']
})
export class SearchPageCategoryComponent implements OnInit {
  public location: any = null;
  private lat: any = null;
  private lng: any = null;
  public loading = false;
  public filters: any = [];
  public data: any = [];
  public meta_key: any = [];
  public id: any = null;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };
  public queryParams: any = {
    limit: 16,
    all_filters: 'all',
    filters: {},
    pagination: 'all',
    with_variations: 'all'
  };


  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private list: ListProductStoreComponent,
              private modalService: BsModalService,
              private route: ActivatedRoute, private router: Router) {
    util.getLocation.subscribe(data => {
      this.location = data['zip_code'][0];
      this.lat = data['customer_lat'];
      this.lng = data['customer_lng'];
    });

  }

  ngOnInit() {
    this.location = this.util.getZipCookie();
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

  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      filters: this.filters
    };

    this.modalRef = this.modalService.show(
      ModalFilterAttributesComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal responsive'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
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
