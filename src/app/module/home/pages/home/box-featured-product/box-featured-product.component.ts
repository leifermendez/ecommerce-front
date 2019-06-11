import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from 'ngx-gallery';
import {TimeagoIntl} from 'ngx-timeago';
import {strings as englishStrings} from 'ngx-timeago/language-strings/es';
import * as moment from 'moment';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';


@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css']
})
export class BoxFeaturedProductComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any[];
  public optionsOws: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private rest: RestService, intl: TimeagoIntl,
              private util: UtilsService,
              private shopping: ShoppingCartComponent) {
    intl.strings = englishStrings;
    intl.changes.next();

    util.getLocation.subscribe(data => {
      this.loadData();
    });
  }

  timeAgoNext = (minutes = 0) => {
    const date = moment()
      .add(minutes, 'minutes');
    return date;
  };

  loadData = () => {
    this.rest.get('/rest/products')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['items']['data'];
        }
      });
  };

  addProduct = (obj) => {
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.addCart(_data);
  };

  ngOnInit() {
    this.optionsOws = {items: 4, dots: false, navigation: true, autoplay: false};

    this.galleryOptions = [
      {
        width: '270px',
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

    if (this.util.getZipCookie()) {
      this.loadData();
    }

  }


}
