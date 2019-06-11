import {Component, OnInit} from '@angular/core';
import {ZipLocationComponent} from '../../../components/zip-location/zip-location.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalBankComponent} from '../modal-bank/modal-bank.component';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-info-bank',
  templateUrl: './info-bank.component.html',
  styleUrls: ['./info-bank.component.css']
})
export class InfoBankComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };

  public data: any;
  constructor(private modalService: BsModalService,
    private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }

  emitBack = () => this.ngOnInit();

  loadData = (

  ) => {
    this.rest.get(`/rest/payment-user`)
      .then((response: any) => {
        if (response['status'] === 'success') {
            this.data = response['data']['data']
            console.log('-------',this.data)
        }
      });
  };

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ModalBankComponent,
      Object.assign({initialState}, {
          class: 'gray modal-md top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

}
