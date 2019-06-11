import {Component, OnInit} from '@angular/core';
import {ZipLocationComponent} from '../../../components/zip-location/zip-location.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalBankComponent} from '../modal-bank/modal-bank.component';

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

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  emitBack = () => this.ngOnInit();

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
