import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrls: ['./info-shop.component.css']
})
export class InfoShopComponent implements OnInit {

  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public id: any = null;
  loading = false;
  public waitCode: any = null;
  public codeValidation = null;
  public dataTmp: any = null;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'legal_id': [null, Validators.compose([Validators.required])],
      'email_corporate': [null, Validators.compose([Validators.required])],
      'phone_mobil': [null, Validators.compose([Validators.required])],
      'phone_fixed': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'meta_key': [null, Validators.compose([Validators.required])],

    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {

  }


  loadData = (id) => {
    this.loading = true;
    this.user_data = this.auth.getCurrentUser();
    this.rest.get(`/rest/user/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform['email'] = this.user_data['email'];
          this.editform = {...response['data']};
          console.log(this.editform);
        }
      });
  };


  save = () => {
    if (event) {
      this.loading = true;
      const method = (this.id) ? 'put' : 'post';
      event.preventDefault();
      this.rest[method](`/rest/shop/${(this.id) ? this.id : ''}`,
        this.editform)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            // this.editform['email'] = this.user_data['email'];
            // this.editform = {...response['data'], ...{email: this.user_data['email']}};
            // this.auth.updateUser(,data);
          }
        }).catch(err => {
        this.loading = false;
      });
    }
  };

}
