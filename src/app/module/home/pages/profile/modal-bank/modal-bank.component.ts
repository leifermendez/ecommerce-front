import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-bank',
  templateUrl: './modal-bank.component.html',
  styleUrls: ['./modal-bank.component.css']
})
export class ModalBankComponent implements OnInit {
  public loading = false;
  public data: any = null;
  public form: any = FormGroup;
  public editform: any = {
    iban: null,
    payment_option: 'stripe'
  };
  public win = {};

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

  openStripe = (url) => new Promise(function (resolve, reject) {
    try {
      const endPoint = url;
      const strWindowFeatures = 'location=yes,height=620,width=520,scrollbars=no,resizable=no,status=yes';
      const win = window.open(endPoint,
        'stripeConnect',
        strWindowFeatures
      );

      setInterval(function () {

        const response_token = `${win.location.href}&`;
        if (response_token) {
          const token = response_token.match(/(?:code)\=([\S\s]*?)\&/)[1];
          if (token) {
            resolve({
              token,
              win
            });
          }
        }
      }, 1000);

    } catch (e) {
      reject(e);
    }
  });

  saveData = () => {
    this.loading = true;
    this.rest.post(`/rest/payment-user`,
      this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];
          this.bsModalRef.hide();
        }
      });
  };

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/stripe-auth`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];

          this.openStripe(this.data)
            .then(res => {
              this.editform['iban'] = res['token'];
              // @ts-ignore
              res.win.close();
            });
        }
      });
  };
}
