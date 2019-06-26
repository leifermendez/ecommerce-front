import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {OwlCarousel} from 'ngx-owl-carousel';
import * as moment from 'moment';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListstoreComponent implements OnInit {
  loading = false;
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any[];
  public optionsOws: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() id: any = null;

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (this.id) {
      this.loadData();
    }
    // this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.idm = params['id'].toString();
    //     this.loadData(this.idm);
    //   }
    // });
    this.optionsOws = {items: 4, dots: false, navigation: true, autoplay: false};

    this.galleryOptions = [
      {
        width: '100%',
        height: '300px',
        thumbnails: false,
        'preview': false,
        'arrowPrevIcon': 'fa fa-angle-left',
        'arrowNextIcon': 'fa fa-angle-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {'breakpoint': 500, 'width': '100%', 'height': '200px'}
      ,
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = [
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      },
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      },
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      }
    ];
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/seller/${this.id}?limit=15&filters=products.status,=,available`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data.data;
        }
      });
  };

  timeAgoNext = (minutes = 0) => {
    const date = moment()
      .add(minutes, 'minutes');
    return date;
  };
  addProduct = (obj) => {
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.addCart(_data);
  };

  detail(id) {
    this.router.navigateByUrl(`/single/${id}`);
  }

}
