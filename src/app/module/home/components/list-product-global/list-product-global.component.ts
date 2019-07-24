import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import * as moment from 'moment';
import {TimeagoIntl} from 'ngx-timeago';

@Component({
  selector: 'app-list-product-global',
  templateUrl: './list-product-global.component.html',
  styleUrls: ['./list-product-global.component.css']
})
export class ListProductGlobalComponent implements OnInit {
  @Input() data: any = {
    list:{
      data :[]
    }
  };
  @Output() callback: EventEmitter<any> = new EventEmitter();
  public loading = false;
  public filters: any = [];
  public meta_key: any = [];
  public src: any = null;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {

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
  }


  timeAgoNext = (minutes = 0) => {

    const date = moment().add(minutes, 'minutes');
    return date;
  };

}

