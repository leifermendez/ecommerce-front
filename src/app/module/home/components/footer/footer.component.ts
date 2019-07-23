import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../../../shared/services/util.service';
import { RestService } from '../../../../shared/services/rest.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: any = false;
  public show: any = false;
  public showLanguage: any = false;
  public loading = false;
  public data: any = null;
  public flagLanguage = 'es'

  constructor(private router: Router,
    private translate: TranslateService,
    private util: UtilsService,
    private rest: RestService) {

  }

  showSwitch = () => this.show = (!this.show);

  showSwitchLanguage = () => this.showLanguage = (!this.showLanguage);

  chooseLanguage = (a,flag) => {
    this.translate.use(a);
    this.flagLanguage = flag;
  }

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
