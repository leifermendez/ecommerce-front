import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../shared/services/util.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {AuthshopService} from '../../../auth/authshop.service';
import {AppComponent} from '../../../../app.component';
import {TranslateService} from '@ngx-translate/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {ZipLocationComponent} from '../zip-location/zip-location.component';
import {SideCategoriesComponent} from '../side-categories/side-categories.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';


declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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

export class HeaderComponent implements OnInit {
  public location: any = null;
  public header = false;
  public subMenu = false;
  public fullMenu = false;
  public user_data: any = null;
  public number_items = 0;
  public activeLang = 'es';
  private lat: any = null;
  private lng: any = null;
  public modeOffset: any = false;
  public modeFocus: any = false;
  public animationBell: any = false;
  modalRef: BsModalRef;
  config = {};

  constructor(private util: UtilsService, private route: ActivatedRoute, private router: Router,
              private cart: ShoppingCartComponent,
              private modalService: BsModalService,
              private auth: AuthshopService, private app: AppComponent, private translate: TranslateService) {
    util.getLocation.subscribe(data => {
      this.location = data['zip_code'][0];
      this.lat = data['customer_lat'];
      this.lng = data['customer_lng'];
    });

    // util.modeFocusProduct.subscribe(a => this.modeFocus = a);

    util.modeVideo.subscribe(data => {
      this.modeOffset = data;
    });

    util.numberShopping.subscribe(data => {
      if (data) {
        // tslint:disable-next-line:radix
        this.number_items = this.number_items + parseInt(data);
        this.animationBell = true;
        setTimeout(() => {
          this.animationBell = false;
        }, 1500);
      }
    });

    util.setNumberShopping.subscribe(a => {
      this.number_items = a;
    });

    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });


  }

  scrollTop = (aid) => {
    const aTag = $(`#${aid}`);
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');

  };

  searchFocus = () => {
    console.log('here');
  };

  openZip = () => this.app.open();

  emitBack = () => this.ngOnInit();

  openCategory() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      SideCategoriesComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal side-categories'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.location = this.util.getZipCookie();
    if (this.user_data) {
      this.cart.loadData();
    }

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const _data = data.state.root.firstChild.data;
        this.header = (_data['header']);
        this.subMenu = (_data['subMenu']);
        this.fullMenu = (_data['fullMenu']);
      }
    });
  }

}
