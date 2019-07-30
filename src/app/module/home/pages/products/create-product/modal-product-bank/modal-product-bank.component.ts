import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-product-bank',
  templateUrl: './modal-product-bank.component.html',
  styleUrls: ['./modal-product-bank.component.css']
})
export class ModalProductBankComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  close = (e) => {
    if (e && e.length) {
      this.bsModalRef.hide();
    }
  };

}
