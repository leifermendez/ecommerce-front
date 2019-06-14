import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-info-shops',
  templateUrl: './info-shops.component.html',
  styleUrls: ['./info-shops.component.css']
})
export class InfoShopsComponent implements OnInit {
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public avatarFile: any = null;
  loading = false;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }


  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shop`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data']['data'];
        }
      });
  };

}
