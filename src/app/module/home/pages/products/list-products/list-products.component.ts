import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public loading = false;
  @Input() id: any = null;
  public data: any = {data: []};

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/seller/${this.id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];

        }
      });
  };

}
