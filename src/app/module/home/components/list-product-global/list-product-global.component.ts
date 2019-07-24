import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../../shared/services/rest.service';
import { UtilsService } from '../../../../shared/services/util.service';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import * as moment from 'moment';
import { TimeagoIntl } from 'ngx-timeago';

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
  public currentPage:any = 1;
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
      { 'breakpoint': 500, 'width': '100%', 'height': '200px' }
      ,
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  pageChanged = (a) => {
    const _pattern = /(page=.?)/gm;
    let url = this.router.url;
    url = url.replace(_pattern, `page=${a.page}`);
    const _query = (_pattern.test(url)) ? {} : { page: a.page }
    console.log('-->',_query)
    console.log('-->',url)
    this.router.navigateByUrl(
      this.router.createUrlTree(
        [url], {queryParams: _query}
      )
    );
    const queryString = Object.keys(_query).map(key => key + '=' + _query[key]).join('&');
    this.router.navigateByUrl(`${url}?${queryString}`);
    /*console.log('problem',url)

  
    const querys = /([^\?]+)(\?.*)?/i;
    const match = _url.match(querys);
    console.log('heree',_url)
    this.callback.emit(match[2])*/

  }

  timeAgoNext = (minutes = 0) => {

    const date = moment().add(minutes, 'minutes');
    return date;
  };

}

