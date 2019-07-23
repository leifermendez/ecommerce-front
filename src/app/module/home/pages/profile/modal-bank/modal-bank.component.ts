import {Component, OnInit, Inject} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {UtilsService} from '../../../../../shared/services/util.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-modal-bank',
  templateUrl: './modal-bank.component.html',
  styleUrls: ['./modal-bank.component.css']
})
export class ModalBankComponent implements OnInit {
  public loading = false;
  public data: any = null;
  public form: any = FormGroup;
  public emitBack: any;
  public id: any = null;
  public deleteMe: any = false;
  public editform: any = {
    iban: null,
    payment_option: 'stripe'
  };
  public win = {};

  constructor(@Inject(WINDOW) private _window: Window, private rest: RestService,
              private fb: FormBuilder,
              private utils: UtilsService,
              public bsModalRef: BsModalRef) {
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
    if (this.id) {
      this.getDetail();
    }
  }

  deleteBank = () => {
    this.loading = true;
    this.rest.delete(`/rest/payment-user/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.emitBack();
          this.bsModalRef.hide();
        }
      });
  };

  getDetail = () => {
    this.loading = true;
    this.rest.get(`/rest/payment-user/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.editform = response['data'];
        }
      });
  };

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
    const method = (this.id) ? 'put' : 'post';
    this.rest[method](`/rest/payment-user/${(this.id) ? this.id : ''}`,
      this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];
          this.emitBack();
          this.bsModalRef.hide();
        }
      }).catch(err => {
      this.loading = false;
      this.utils.openSnackBar('Algo ocurrio', 'error');
    });
  };

  getAct = (code) => {
    this.loading = true;
    this.rest.post(`/rest/stripe-auth`, {
      code
    })
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform['iban'] = response['data']['stripe_user_id'];
        }

      }).catch(err => {
      this.loading = false;
      console.log('--->',err)
      this.utils.openSnackBar(err.error.msg, 'error');
    });
  };

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/stripe-auth`)
      .then((response: any) => {
        if (response['status'] === 'success') {

          this.data = response['data'];

          this.openStripe(this.data)
            .then(res => {
              this.getAct(res['token'])
              // @ts-ignore
              res.win.close();
              this.loading = false;
            });
        }
      });
  };
}
