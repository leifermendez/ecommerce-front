import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {BoxFeaturedProductComponent} from '../../../pages/home/box-featured-product/box-featured-product.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {OwlCarousel} from 'ngx-owl-carousel';
import {strings as englishStrings} from 'ngx-timeago/language-strings/es';
import * as moment from 'moment';
import {TimeagoIntl} from 'ngx-timeago';

@Component({
  selector: 'app-list-product-store',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListProductStoreComponent implements OnInit {
  loading = false;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any = {
    list: {
      data: []
    }
  };
  public optionsOws: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() id: any = null;
  @Input() src: any = null;
  @Input() type: any = 'search';
  public loading_save: any = false;

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              intl: TimeagoIntl,
              private boxFeatured: BoxFeaturedProductComponent,
              private route: ActivatedRoute, private router: Router) {
    intl.strings = englishStrings;
    intl.changes.next();
  }

  ngOnInit() {
    if (this.type === 'search') {
      this.loadSrc(this.src);
    } else {
      this.loadData();
    }

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
    this.rest.get(`/rest/seller/${this.id}?limit=15&filters=products.status,=,available&all_filters=all`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.callback.emit(this.data['filter']);
        }
      });
  };

  loadSrc = (src) => {
    console.log('entre aqio');
    this.loading = true;
    this.rest.get(`/rest/search?src=${encodeURI(src)}&all_filters=all&pagination=full`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.callback.emit(this.data['filter']);
        }
      });
  };


  timeAgoNext = (minutes = 0) => {

    const date = moment().add(minutes, 'minutes');
    return date;
  };

  open = (a) => this.boxFeatured.open(a);

}
