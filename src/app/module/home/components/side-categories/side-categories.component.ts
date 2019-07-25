import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-side-categories',
  templateUrl: './side-categories.component.html',
  styleUrls: ['./side-categories.component.css']
})
export class SideCategoriesComponent implements OnInit {
  public loading = false;
  public data: any = {};

  constructor(private rest: RestService,
              private util: UtilsService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/categories?group=all`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          if (response['data']) {
            this.data = response['data'];
          }
        }
      });
  };
}
