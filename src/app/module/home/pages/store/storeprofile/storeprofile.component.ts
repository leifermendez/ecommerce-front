import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../../../../shared/services/rest.service';
import { UtilsService } from '../../../../../shared/services/util.service';
import { ShoppingCartComponent } from '../../../components/shopping-cart/shopping-cart.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-storeprofile',
  templateUrl: './storeprofile.component.html',
  styleUrls: ['./storeprofile.component.css']
})
export class StoreprofileComponent implements OnInit {
  loading = false;
  idparam: any;

  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any = {
    image_header_large: null,
    image_cover_medium: null,
    name: null
  };
  public queryParams: any = {
    limit: 1,
    filters: 'products.status,=,available',
    all_filters: 'all'
  }
  public filters: any = [];
  public meta_key: any = [];

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
    private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    const [id] = this.route.snapshot.params.id.split('-');
    this.idparam = id.toString();
    this.route.queryParams.subscribe(params => {
      this.queryParams = { ...this.queryParams, ...params };
      this.loadData(this.idparam);
    });

  }

  setVariable = (a) => {
    this.queryParams = { ...this.queryParams, ...{ category: a.id } }
  }

  loadData = (id = null) => {
    this.loading = true;
    this.rest.get(`/rest/seller/${id}`, this.queryParams)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.filters = this.data['filter']
        }
      });
  };
}
