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
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalShoppingComponent } from '../../../components/modal-shopping/modal-shopping.component';


@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css']
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
  constructor(private rest: RestService, intl: TimeagoIntl,
              private util: UtilsService,
              private auth: AuthshopService,
              private shopping: ShoppingCartComponent,
              private modalService: BsModalService) {
    intl.strings = englishStrings;
    intl.changes.next();
    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });

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
    this.loading = true;
    this.rest.get(`/rest/products?filters=products.status,=,available&limit=${this.limit}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['items']['data'];
        }
      });
  };

  emitBack = () => this.ngOnInit();

  open(data) {
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

  addProduct = (obj) => {
    const _data = {
      product_id: obj['id'],
      product_variation_id: obj['variations']['item'][0]['id'],
      shop_id: obj['shop_id']
    };

    this.loading_save = true;
    this.shopping.add(_data)
      .then(response => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          // this.util.refreshShopping.emit(response['data']);
          this.util.openSnackBar('Articulo agregado', 'success');
        }
      }).catch(err => {
      this.loading_save = false;
      const msg = (err && err['error']) ? err['error'] : 'Debes iniciar session';
      this.util.openSnackBar(msg, 'error');
    });

  };

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
