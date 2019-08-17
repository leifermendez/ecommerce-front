import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {UtilsService} from '../../../../shared/services/util.service';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-modal-shopping',
  templateUrl: './modal-shopping.component.html',
  styleUrls: ['./modal-shopping.component.css']
})
export class ModalShoppingComponent implements OnInit, AfterViewInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  public data: any = {
    name: ''
  };
  public variation:any;
  public error: any = false;
  public loading_save = true;
  public finish = false;
  public qty_list = [];
  public owlOption: any;
  public qty = 1;

  constructor(public bsModalRef: BsModalRef,
              private shopping: ShoppingCartComponent,
              private util: UtilsService,
              private elem: ElementRef) {
  }

  ngOnInit() {
    // this.addProduct(this.data);
    this.owlOption = {
      nav: true,
      items: 1,
      dots: false,
      navigation: true,
      onTranslated: this.onTranslated.bind(this),
    };
  }

  ngAfterViewInit() {
    console.log('--------',this.variation)
    const _qty = (this.variation && this.variation.quantity) ? this.variation.quantity : 0;
    this.qty_list = Array.from(Array(_qty), (_,x) => x+1);
  }

  onTranslated = (a) => {
    let elements = this.elem.nativeElement.querySelectorAll('.product_image .owl-stage-outer .owl-stage .active h1');
    elements = (elements && elements[0]) ? elements[0] : null;
    this.qty = elements.dataset['index'];
  };

  addProduct = () => {
    const obj = this.data;
    this.finish = true;
    this.loading_save = true;
    console.log('--->', obj);
    if ((obj['variations'].length) || (obj['variations']['item'].length)) {
      const _variation_id = (obj['variations']['item']) ? obj['variations']['item'][0]['id'] :
        obj['variations'][0]['id'];
      const _data = {
        product_id: obj['id'],
        product_variation_id: _variation_id,
        shop_id: obj['shop_id'],
        qty: this.qty
      };
      this.shopping.add(_data)
        .then(response => {
          this.loading_save = false;
          if (response['status'] === 'success') {
            this.util.numberShopping.emit(1);
            this.util.openSnackBar('Item agregado', 'success');
          }
        })
        .catch(err => {
          this.loading_save = false;
          this.error = (err && err['error']) ? err['error'] : 'not_session';
        });
    } else {
      this.bsModalRef.hide();
    }

  };

}
