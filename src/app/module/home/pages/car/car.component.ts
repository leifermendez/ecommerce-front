import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  data: any = [];
  loading = false;
  total: any;
  total_shop: any;

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.rest.get(`/rest/shopping-cart`).then((response: any) => {
      this.util.refreshShoppingData.emit(response['data']);
      this.data = response.data;
      this.total = response.data.total[0];
      this.loading = false;
    }).catch((error: any) => {
      this.loading = false;
      this.util.openSnackBar('Ups! algo ocurrio', 'error');
    });
  }

  delete(id) {
    this.loading = true;
    this.rest.delete(`/rest/shopping-cart/${id}`).then((response: any) => {
      this.loadData();
    }).catch((error: any) => {
      this.loading = false;
      this.util.openSnackBar('Ups! algo ocurrio', 'error');
    });
  }
}
