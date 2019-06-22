import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-sale',
  templateUrl: './single-sale.component.html',
  styleUrls: ['./single-sale.component.css']
})
export class SingleSaleComponent implements OnInit {


  private loading = false;
  public data: any = {};
  public id = null;

  constructor(private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.loadData(this.id);
    });
  }

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/sales/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
        }
      });
  };
}
