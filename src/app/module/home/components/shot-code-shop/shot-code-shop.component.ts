import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {AuthshopService} from '../../../auth/authshop.service';

@Component({
  selector: 'app-shot-code-shop',
  templateUrl: './shot-code-shop.component.html',
  styleUrls: ['./shot-code-shop.component.css']
})
export class ShotCodeShopComponent implements OnInit {
  public data_shops: any = [];
  public loading = false;
  public rangeDate: any;
  public user_data: any;

  constructor(private router: Router,
              private rest: RestService,
              private auth: AuthshopService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.user_data = this.auth.getCurrentUser();
    this.loading = true;
    this.rest.get(`/rest/shop?limit=50&filters=users_id,=,${this.user_data['id']}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data_shops = response['data']['data'];
        }
      });
  };
}
