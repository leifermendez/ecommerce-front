import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OwlCarousel} from 'ngx-owl-carousel';

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

  public filters: any = [];
  public meta_key: any = [];

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      const [id] = params.id.split('-');
      if (id) {
        this.idparam = id.toString();
        this.loadData(this.idparam);
      }
    });
  }

  ngOnInit() {

  }

  setVariable = (a) => this.filters = a;

  loadData = (src) => {
    this.loading = true;
    this.rest.get(`/rest/search?src=${encodeURI(src)}&all_filters=all`)
      .then((response: any) => {
        console.log('---->', response);
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.meta_key = this.data['meta_key'].split(',');
        }
      });
  };
}
