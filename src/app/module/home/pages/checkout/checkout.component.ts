import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {WelcomeComponent} from '../../components/welcome/welcome.component';
import {ModalShippingComponent} from '../profile/modal-shipping/modal-shipping.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  data: any = [];
  loading = false;
  addres: any;
  addreselect: any = null;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private modalService: BsModalService) {
  }

  emitBack = () => this.ngOnInit();

  ngOnInit() {

    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.rest.get(`/rest/shipping`).then((response: any) => {
      this.data = response.data;
      this.addreselect = (this.data.data && this.data.data.length) ?
        this.data.data[0] : null;

      console.log('-->', this.data);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  openaddres(datElement = null) {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      // id: datElement
    };

    this.modalRef = this.modalService.show(
      ModalShippingComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  selectOptions = (e) => {
    if (e && e['id']) {
      this.addres = e;
    }
  };

  purchase() {
    this.loading = true;
    this.rest.post('/rest/purchase', {}).then((response: any) => {
      console.log(response);
      console.log(this.data);
    }).catch((error: any) => {
      console.log(error);
    });
  }

}
