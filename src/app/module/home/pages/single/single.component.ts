import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RestService } from '../../../../shared/services/rest.service';
import { UtilsService } from '../../../../shared/services/util.service';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { ActivatedRoute } from '@angular/router';
import { DiscountNumberComponent } from '../../components/discount-number/discount-number.component';
import { ModalShoppingComponent } from '../../components/modal-shopping/modal-shopping.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
  animations: [
    trigger('breadcrumbs', [
      transition(':enter', [
        style({ transform: 'translateX(-40%)', opacity: '0' }),
        animate('0.3s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(40%)', opacity: '1' }))
      ])
    ]),
    trigger('details', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class SingleComponent implements OnInit {
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

  constructor(private rest: RestService, private util: UtilsService,
    private shopping: ShoppingCartComponent,
    private route: ActivatedRoute,
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
        console.log('--', data);
      }
    });

    route.params.subscribe(params => {
      const [id] = params.id.split('-');
      if (id) {
        this.idparam = id.toString();
        this.loadData(this.idparam);
      }
    });
  }

  addTags = (data) => {
    this.titleService.setTitle(`${data['name']} | Apatxee.com`);
    this.meta.updateTag({ name: 'keywords', content: data['short_description'] });
    this.meta.updateTag({ name: 'description', content: data['short_description'] });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTags([
      { name: 'og:title', content: data['name']},
      { name: 'og:description', content: data['short_description']},
      { name: 'og:image', content: data['cover_image']['large']}
    ]);
  }

  ngOnInit() {

  }

  changeCover = (a) => this.cover = a;

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/products/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          console.log('--->', response['data']['variations']);
          this.data = response.data;
          this.addTags(this.data);
          this.variation = response['data']['variations']['item'];
          this.selectedvariationName = response['data']['variations']['item'][0];
          this.cover = (response['data']['gallery'] && response['data']['gallery'].length)
            ? response['data']['gallery'][0] : null;
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
      Object.assign({ initialState }, {
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
