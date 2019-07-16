import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';

import {UtilsService} from '../../../../shared/services/util.service';
import {RestService} from '../../../../shared/services/rest.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: any = false;
  public show: any = false;
  public loading = false;
  public data: any = null;

  constructor(private router: Router,
              private util: UtilsService,
              private rest: RestService) {

  }

  showSwitch = () => this.show = (!this.show);

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const _data = data.state.root.firstChild.data;
        this.footer = (_data['footer']);
      }
    });
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/blog?filters=to,=,footer`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          if (response['data']) {
            this.data = response['data']['data'];
          }
        }
      });
  };

}
