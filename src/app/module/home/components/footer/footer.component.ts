import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../../../shared/services/util.service';
import { RestService } from '../../../../shared/services/rest.service';
import { DeviceDetectorService } from 'ngx-device-detector';


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
  public computer: any = false;
  public mobile: any = false;
  public tablet: any = false;

  constructor(private router: Router,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
    private util: UtilsService,
    private rest: RestService) {
    this.computer = this.deviceService.isDesktop();
    this.mobile = this.deviceService.isMobile();
    this.tablet = this.deviceService.isTablet();

  }

  showSwitch = () => this.show = (!this.show);

  showSwitchLanguage = () => this.showLanguage = (!this.showLanguage);

  chooseLanguage = (a, flag) => {
    this.translate.use(a);
    this.flagLanguage = flag;
  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const _data = data.state.root.firstChild.data;
        this.footer = (_data['footer']);
        if (this.footer) this.loadData();
      }
    });

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
