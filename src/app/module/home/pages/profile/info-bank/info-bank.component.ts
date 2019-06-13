import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalBankComponent} from '../modal-bank/modal-bank.component';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {AuthshopService} from '../../../../auth/authshop.service';

@Component({
  selector: 'app-info-bank',
  templateUrl: './info-bank.component.html',
  styleUrls: ['./info-bank.component.css']
})
export class InfoBankComponent implements OnInit {

  constructor(private modalService: BsModalService,
              private rest: RestService,
              public util: UtilsService,
              private auth: AuthshopService) {
  }

  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };

  currentUser: any = null;
  loading = false;
  public data: any;
  pop: any;

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.loadData();
  }

  emitBack = () => this.ngOnInit();

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/payment-user`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data']['data'];
          console.log('-------', this.data);
        }
      });
  };

  open(id = null) {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      id
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
