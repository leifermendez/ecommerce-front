import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  public data: any = [];

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.rest.get('/rest/delivery')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
        }
      });
  };
}
