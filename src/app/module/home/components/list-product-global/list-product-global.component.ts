import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import * as moment from 'moment';

@Component({
  selector: 'app-list-product-global',
  templateUrl: './list-product-global.component.html',
  styleUrls: ['./list-product-global.component.css']
})
export class ListProductGlobalComponent implements OnInit {
  @Input() data: any = {
    list: {
      data: []
    }
  };
  @Output() callback: EventEmitter<any> = new EventEmitter();
  public loading = false;
  public filters: any = [];
  public meta_key: any = [];
  public src: any = null;
  public loading_save = false;
  public currentPage: any = 1;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
    this.currentPage = (this.data['list'] && this.data['list']['current_page']) ?
      this.data['list']['current_page'] : 0;
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

  pageChanged = (a) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: a.page
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  };

  timeAgoNext = (minutes = 0) => {
    return moment().add(minutes, 'minutes');
  };

}

