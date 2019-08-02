import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from 'ngx-gallery';
import {TimeagoIntl} from 'ngx-timeago';
import {strings as englishStrings} from 'ngx-timeago/language-strings/es';
import * as moment from 'moment';
import {UtilsService} from '../../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../../components/shopping-cart/shopping-cart.component';
import {AuthshopService} from '../../../../auth/authshop.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalShoppingComponent} from '../../../components/modal-shopping/modal-shopping.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
      ])
    ])
  ]
})
export class BoxFeaturedProductComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  @Input() title: any = null;
  @Input() w: any = '245px';
  @Input() h: any = '300px';
  @Input() items: any = 4;
  @Input() limit: any = 6;
  public data: any[];
  public optionsOws: any;
  public user_data: any = null;
  public loading: any = false;
  public loading_save: any = false;
  config = {};
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  modalRef: BsModalRef;
  public computer: any = false;
  public mobile: any = false;
  public tablet: any = false;
  public queryParams: any = {
    limit: 5,
    all_filters: 'all',
    pagination: 'all',
    with_variations: 'all'
  };

  constructor(private rest: RestService, intl: TimeagoIntl,
              private util: UtilsService,
              private auth: AuthshopService,
              private shopping: ShoppingCartComponent,
              private deviceService: DeviceDetectorService,
              private modalService: BsModalService) {
    intl.strings = englishStrings;
    intl.changes.next();
    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });

    util.getLocation.subscribe(data => {
      this.loadData();
    });

    this.computer = this.deviceService.isDesktop();
    this.mobile = this.deviceService.isMobile();
    this.tablet = this.deviceService.isTablet();
  }

  timeAgoNext = (minutes = 0) => {
    const date = moment()
      .add(minutes, 'minutes');
    return date;
  };

  loadData = () => {

    this.loading = true;
    this.rest.get(`/rest/search`, this.queryParams)
      .then((response: any) => {
        console.log('change__', response);
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['list']['data'];
        }
      });
  };

  emitBack = () => this.ngOnInit();

  open(data) {
    this.util.closeAllModals();
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      data
    };

    this.modalRef = this.modalService.show(
      ModalShoppingComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  ngOnInit() {
    this.optionsOws = {
      dots: false,
      navigation: true,
      autoplay: false,
      items: this.items,
      margin: 5,
      autoWidth: true,
    };
    this.data = [1, 1, 1, 1];
    this.galleryOptions = [
      {
        width: this.w,
        height: this.h,
        thumbnails: false,
        imageAutoPlay: false,
        imageAutoPlayInterval: 5000,
        imageInfinityMove: true,
        'preview': false,
        'arrowPrevIcon': 'fa fa-angle-left',
        'arrowNextIcon': 'fa fa-angle-right'
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
