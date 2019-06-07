import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TimeagoIntl } from 'ngx-timeago';
import {strings as englishStrings} from 'ngx-timeago/language-strings/es';
import * as moment from 'moment';


@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css']
})
export class BoxFeaturedProductComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any;
  public optionsOws: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  
  constructor(private rest: RestService, intl: TimeagoIntl) {
    intl.strings = englishStrings;
    intl.changes.next();
  }

  ngOnInit() {
    this.optionsOws = {items: 4, dots: false, navigation: true, autoplay: false};

    this.galleryOptions = [
      {
          width: '270px',
          height: '300px',
          thumbnails:false,
          "preview": false, 
          "arrowPrevIcon": "fa fa-angle-left",
           "arrowNextIcon": "fa fa-angle-right",
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      { "breakpoint": 500, "width": "100%", "height": "200px" }
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

    this.rest.get('/rest/products')
      .then((response: any) => {
        if (response['status'] === 'success') {

          response = response['data'];
          this.data = response['items']['data'];
          console.log(this.data);
        }
      });
  }

}
