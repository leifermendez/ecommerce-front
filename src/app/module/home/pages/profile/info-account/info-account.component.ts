import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';

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

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService) {
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

  loadData = (id) => {
    this.loading = true;
    this.user_data = this.auth.getCurrentUser();
    this.rest.get(`/rest/user/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform = response['data'];
          console.log(this.editform);
        }
      });
  };

  saveData = () => {
    if (event) {
      this.loading = true;
      event.preventDefault();
      console.log('EDIT', this.editform);
      this.rest.put(`/rest/user/me`, this.editform)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            // this.editform['email'] = this.user_data['email'];
            // this.editform = {...response['data'], ...{email: this.user_data['email']}};
            // this.auth.updateUser(,data);
          }
        });
    }
  };

}
