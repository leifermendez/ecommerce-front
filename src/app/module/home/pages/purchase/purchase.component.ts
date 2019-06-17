import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public data: any = {data: []};
  public loading = false;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get('/rest/purchase')
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];

        }
      });
  };
}
