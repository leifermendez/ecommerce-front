import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RestService} from '../../../../../shared/services/rest.service';
import { ModalShippingComponent } from '../modal-shipping/modal-shipping.component';

@Component({
  selector: 'app-info-address',
  templateUrl: './info-address.component.html',
  styleUrls: ['./info-address.component.css']
})
export class InfoAddressComponent implements OnInit {
  loading = false;
  public data: any;

  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,
    private rest: RestService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/payment-user`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
            this.data = response['data']['data']
            console.log('-------',this.data)
        }
      });
  };

  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ModalShippingComponent,
      Object.assign({initialState}, {
          class: 'gray modal-md top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

}
