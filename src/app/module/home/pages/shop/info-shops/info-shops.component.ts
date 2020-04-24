import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormGroup} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';

@Component({
  selector: 'app-info-shops',
  templateUrl: './info-shops.component.html',
  styleUrls: ['./info-shops.component.css']
})
export class InfoShopsComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = [];
  public editform: any = {};
  public avatarFile: any = null;
  loading = false;

  constructor(private rest: RestService,
              private auth: AuthshopService) {
  }

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.loadData();
  }


  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shop?limit=50&filters=shops.users_id,=,${this.user_data['id']}&outside=yes`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data']['data'];
          this.callback.emit(this.data);
        }
      });
  };

}
