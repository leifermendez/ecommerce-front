import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OwlCarousel} from 'ngx-owl-carousel';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from 'ngx-gallery';

@Component({
  selector: 'app-storeprofile',
  templateUrl: './storeprofile.component.html',
  styleUrls: ['./storeprofile.component.css']
})
export class StoreprofileComponent implements OnInit {
  loading = false;
  idparam: any;
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any[];
  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idparam = params['id'].toString();
        this.loadData(this.idparam);
      }
    });
  }

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/shop/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
        }
      });
  }
}
