import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.css']
})
export class InfoAccountComponent implements OnInit {
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public avatarFile: any = null;
  loading = false;
  public waitCode: any = null;
  public codeValidation = null;
  public dataTmp: any = null;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'referer_code': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose(
        [Validators.required,
          Validators.minLength(4)])],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    const _data = this.auth.getCurrentUser();
    this.loadData(_data['id']);
  }

  getNumber = (a) => {
    this.editform[`phone`] = a;
  };

  telInputObject = (a) => {
    console.log('-->', a);
  };

  hasError = (a) => {
    this.editform[`phone_valid`] = a;
  };

  onCountryChange = (a) => console.log('--->', a);

  loadData = (id) => {
    this.loading = true;
    this.user_data = this.auth.getCurrentUser();
    this.rest.get(`/rest/user/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform = response['data'];
          this.dataTmp = response['data']['phone'];
        }
      });
  };

  saveData = () => {
    if (event) {
      delete this.editform['phone_valid'];
      this.loading = true;
      event.preventDefault();
      this.rest.put(`/rest/user/me`, this.editform)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.ngOnInit();
            // this.editform['email'] = this.user_data['email'];
            // this.editform = {...response['data'], ...{email: this.user_data['email']}};
            // this.auth.updateUser(,data);
          }
        });
    }
  };

  validatePhone = (code = null) => {
    if (event) {
      this.loading = true;
      const method = (code) ? 'put' : 'post';
      const _data = {
        phone: this.editform['phone']
      };
      event.preventDefault();
      this.rest[method](`/rest/validatePhone${(code) ? `/${this.codeValidation}` : ''}`,
        (code) ? null : _data)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            console.log(response['data']);
            this.auth.updateUser('confirmed', '1');
            if (code) {
              this.saveData();
            }
            this.waitCode = (!code);

          }
        })
        .catch((error) => {
          this.loading = false;
          this.util.openSnackBar('Numero no valido', 'try again');
        });
    }
  };

  save = () => {
    if (this.dataTmp !== this.editform['phone']) {
      this.validatePhone();
    } else if (!this.editform['confirmed']) {
      this.validatePhone();
    } else {
      this.saveData();
    }
  };
}
