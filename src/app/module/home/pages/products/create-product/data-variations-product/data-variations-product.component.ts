import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../../../../../shared/services/rest.service';

@Component({
  selector: 'app-data-variations-product',
  templateUrl: './data-variations-product.component.html',
  styleUrls: ['./data-variations-product.component.css']
})
export class DataVariationsProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  public loading = false;
  public data_product: any = [];

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.rest.get(`/rest/products/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.data_product = response['data'];
        }
      });
  };

  save_variation = () => {

  };
}
