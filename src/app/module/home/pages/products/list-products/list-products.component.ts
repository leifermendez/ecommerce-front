import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {AuthshopService} from '../../../../auth/authshop.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public loading = false;
  @Input() id: any = null;
  public data: any = {data: []};
  public user_data:any = null;

  constructor(private rest: RestService, private auth: AuthshopService) {
  }

  ngOnInit() {
    this.loadData();
    this.user_data = this.auth.getCurrentUser();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/seller/${this.id}?limit=10&filters=products.status,=,available`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];

        }
      });
  };

  deleteProduct = (id) => {
    this.rest.put(`/rest/products/${id}`,
      {
        status: 'unavailable'
      })
      .then((response: any) => {
        this.loading = false;
        // if (response['status'] === 'success') {
        //   this.data = response['data'];
        //
        // }
      });
  };

}
