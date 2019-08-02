import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OwlCarousel} from 'ngx-owl-carousel';
import {ModalFilterAttributesComponent} from '../../../components/modal-filter-attributes/modal-filter-attributes.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-storeprofile',
  templateUrl: './storeprofile.component.html',
  styleUrls: ['./storeprofile.component.css']
})
export class StoreprofileComponent implements OnInit {
  public location: any = null;
  private lat: any = null;
  private lng: any = null;
  loading = false;
  idparam: any;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };

  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any = {
    image_header_large: null,
    image_cover_medium: null,
    name: null
  };
  public queryParams: any = {
    limit: 16,
    all_filters: 'all',
    filters: {},
    pagination: 'all',
    with_variations: 'all'
  };
  public filters: any = {};
  public meta_key: any = [];

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
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
    const [id] = this.route.snapshot.params.id.split('-');
    this.idparam = id.toString();
    this.route.queryParams.subscribe(params => {
      this.queryParams = {...this.queryParams, ...params};
      this.queryParams['filters'] = (params['filters']) ? params['filters'] : `shops.id,=,${this.idparam}`;
      this.queryParams['attributes_filter'] = (params['attributes_filter']) ? params['attributes_filter'] : '';
      this.loadData(this.idparam);
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

  loadData = (id = null) => {
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
