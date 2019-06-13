import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RestService} from '../../../../../shared/services/rest.service';
import {ModalShippingComponent} from '../modal-shipping/modal-shipping.component';
import {UtilsService} from '../../../../../shared/services/util.service';

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
              private rest: RestService,
              public util: UtilsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shipping`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data']['data'];
          console.log('-------', this.data);
        }
      });
  };

  emitBack = () => this.ngOnInit();

  open(datElement = null) {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      id: datElement
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

}
