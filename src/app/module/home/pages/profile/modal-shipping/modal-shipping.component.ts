import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../shared/services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-shipping',
  templateUrl: './modal-shipping.component.html',
  styleUrls: ['./modal-shipping.component.css']
})
export class ModalShippingComponent implements OnInit {

  public loading = false;
  public data: any = null;
  public form: any = FormGroup;
  public editform: any = {
    iban: null,
    payment_option: 'stripe'
  };


  constructor(private rest: RestService,
    private fb: FormBuilder,
    private bsModalRef: BsModalRef) {
    this.form = fb.group({
      'payment_option': [null, Validators.compose([Validators.required])],
      'payment_email': [null, Validators.compose([Validators.required])],
      'iban': [null, Validators.compose([Validators.required])],
      'observation': '',
      'account_name': [null, Validators.compose([Validators.required])],
      'account_lastname': [null, Validators.compose([Validators.required])],
      'attached_id': '',
    });
  }

  ngOnInit() {
  }

}
