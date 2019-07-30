import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalProductBankComponent} from '../../pages/products/create-product/modal-product-bank/modal-product-bank.component';

@Component({
  selector: 'app-prevent-wizard',
  templateUrl: './prevent-wizard.component.html',
  styleUrls: ['./prevent-wizard.component.css']
})
export class PreventWizardComponent implements OnInit {

  public loading = false;
  public data = {
    bank: false,
    schedule: false,
  };
  config = {};
  public id: any;
  modalRef: BsModalRef;
  private loading_save = false;

  constructor(private rest: RestService,
              public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private utils: UtilsService) {
  }

  ngOnInit() {

  }

  openModalBank() {
    const initialState = {
      ignoreBackdropClick: true,
    };

    this.modalRef = this.modalService.show(
      ModalProductBankComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

}
