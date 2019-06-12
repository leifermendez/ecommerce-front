import {Component, OnInit} from '@angular/core';
import {AuthshopService} from '../../../../auth/authshop.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../shared/services/rest.service';
import {FileItem, HttpClientUploadService} from '@wkoza/ngx-upload';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.css']
})
export class InfoProfileComponent implements OnInit {
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public avatarFile: any = null;
  loading = false;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

    const _data = this.auth.getCurrentUser();
    this.loadData(_data['id']);


  }

  success = (obj) => {
    this.editform['avatar'] = obj['data']['small'];
  };

  loadData = (id) => {
    this.loading = true;
    this.user_data = this.auth.getCurrentUser();
    this.rest.get(`/rest/user/${id}`)
      .then((response: any) => {
        this.loading = false
        if (response['status'] === 'success') {
          this.editform['email'] = this.user_data['email'];
          this.editform = {...response['data']};
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
          this.loading = false
          if (response['status'] === 'success') {
            // this.editform['email'] = this.user_data['email'];
            // this.editform = {...response['data'], ...{email: this.user_data['email']}};
            // this.auth.updateUser(,data);
          }
        });
    }
  };

}
