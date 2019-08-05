import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {DiscountNumberComponent} from '../../components/discount-number/discount-number.component';
import {ModalShoppingComponent} from '../../components/modal-shopping/modal-shopping.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {Title, Meta} from '@angular/platform-browser';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import * as moment from 'moment';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
  animations: [
    trigger('breadcrumbs', [
      transition(':enter', [
        style({transform: 'translateX(-40%)', opacity: '0'}),
        animate('0.3s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({transform: 'translateX(40%)', opacity: '1'}))
      ])
    ]),
    trigger('details', [
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
export class SingleComponent implements OnInit {
  nowCookies = moment().add(15, 'days').toDate();
  dayCookies = moment().add(1, 'days').toDate();
  @ViewChild('discountChild') discountChild: DiscountNumberComponent;
  data: any = {
    gallery: []
  };
  config = {};
  modalRef: BsModalRef;
  loading = false;
  loading_save = false;
  cover: any = null;
  count: any = 1;
  variation: any = [];
  number_items: any = false;
  selectedvariationName: any;
  idparam: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private meta: Meta,
              private titleService: Title,
              private modalService: BsModalService) {

    this.util.refreshShopping.subscribe(data => {
      if (data) {
        this.loading_save = false;
      }
    });
    util.numberShopping.subscribe(data => {
      if (data) {
        this.number_items = data;
      }
    });

    route.params.subscribe(params => {
      const [id] = params.id.split('-').reverse();
      if (id) {
        this.idparam = id.toString();
        this.loadData(this.idparam);
      }
    });
  }

  addTags = (data) => {
    this.titleService.setTitle(`${data['name']} | Apatxee.com`);
    this.meta.updateTag({name: 'keywords', content: data['short_description']});
    this.meta.updateTag({name: 'description', content: data['short_description']});
    this.meta.updateTag({name: 'robots', content: 'index, follow'});
    this.meta.addTags([
      {name: 'og:title', content: data['name']},
      {name: 'og:description', content: data['short_description']},
      {name: 'og:image', content: data['cover_image']['large']}
    ]);
  };

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        thumbnails: true,
        thumbnailsColumns: 6,
        imagePercent: 83,
        thumbnailsRemainingCount: true,
        thumbnailsPercent: 17,
        thumbnailsSwipe: true,
        preview: true,
        thumbnailSize: NgxGalleryImageSize.Contain,
        arrowPrevIcon: 'fa fa-angle-left',
        arrowNextIcon: 'fa fa-angle-right',
        imageSize: NgxGalleryImageSize.Contain,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        'breakpoint': 500,
        'width': '100%',
        'height': '22rem',
        thumbnails: false,
        preview: true,
        'arrowPrevIcon': 'fa fa-angle-left',
        'arrowNextIcon': 'fa fa-angle-right',
        imageAnimation: NgxGalleryAnimation.Slide
      }
      ,
      // max-width 400
      {
        breakpoint: 400,
        'width': '100%',
        'height': '20rem',
        preview: true,
        thumbnails: false,
        'arrowPrevIcon': 'fa fa-angle-left',
        'arrowNextIcon': 'fa fa-angle-right',
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];


  }

  changeCover = (a) => this.cover = a;

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/products/${id}?timestamp=${Date.now()}`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.data = response.data;
          this.addTags(this.data);
          this.variation = response['data']['variations']['item'];
          this.selectedvariationName = response['data']['variations']['item'][0];
          this.cover = (response['data']['gallery'] && response['data']['gallery'].length)
            ? response['data']['gallery'][0] : null;

          if (this.data && this.data.labels && this.data.labels['label']) {
            this.cookieService.set(
              '_check_session_label',
              this.data.labels['label'],
              this.nowCookies,
              '/');
          }

          if (this.data && this.data.labels) {
            this.cookieService.set(
              '_check_session_label_exists',
              this.data.labels['exists'],
              this.dayCookies,
              '/');
          }
        }
      });
  };

  emitBack = () => this.ngOnInit();

  open(data) {
    console.log('--d--d-d-',data)
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      data: data
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

  changeVariation = () => this.discountChild.init();

  addProduct = (obj) => {
    this.loading_save = true;
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };
    this.shopping.add(_data)
      .then(response => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          this.util.refreshShopping.emit(response['data']);
        }
      })
      .catch(err => {
        this.loading_save = false;
        const msg = (err && err['error']) ? err['error'] : 'Debes iniciar session';
        this.util.openSnackBar(msg, 'error');
      });
  };
}
