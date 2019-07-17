import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';

@Component({
  selector: 'app-address-shopping-cart',
  templateUrl: './address-shopping-cart.component.html',
  styleUrls: ['./address-shopping-cart.component.css']
})
export class AddressShoppingCartComponent implements OnInit {
  public loading: any = false;
  public data: any = {};

  constructor(private modalService: BsModalService,
              private rest: RestService,
              public util: UtilsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shipping`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data']['data'];
          console.log('-------', this.data);
        }
      });
  };

}
