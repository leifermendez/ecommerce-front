import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-purchase',
  templateUrl: './single-purchase.component.html',
  styleUrls: ['./single-purchase.component.css']
})
export class SinglePurchaseComponent implements OnInit {
  public loading = false;
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
    this.rest.get(`/rest/purchase/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
        }
      });
  };
}
