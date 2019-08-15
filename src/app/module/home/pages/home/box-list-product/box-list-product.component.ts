import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../../shared/services/util.service';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-box-list-product',
  templateUrl: './box-list-product.component.html',
  styleUrls: ['./box-list-product.component.css']
})
export class BoxListProductComponent implements OnInit, AfterViewInit {
  @Input() listNumber: any = 1;
  @Input() order: any = false;
  public loading: any = false;
  public data: any = [];
  public queryParams: any = {
    limit: 5,
    all_filters: 'all',
    pagination: 'all',
    with_variations: 'all'
  };

  constructor(private rest: RestService,  private util: UtilsService,) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {

  }

  loadData = () => {
    this.queryParams['order'] = this.order;
    this.loading = true;
    this.rest.get(`/rest/search`, this.queryParams)
      .then((response: any) => {
        console.log('change__', response);
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['list']['data'];
          console.log(this.data);
        }
      });
  };

}
