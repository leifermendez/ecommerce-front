import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../shared/services/util.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {AuthshopService} from '../../../auth/authshop.service';
import {AppComponent} from '../../../../app.component';
import {TranslateService} from '@ngx-translate/core';


declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public location: any = null;
  public header = false;
  public subMenu = false;
  public user_data: any = null;
  public number_items = 0;
  public activeLang = 'es';
  private lat: any = null;
  private lng: any = null;
  public modeOffset:any = false;

  constructor(private util: UtilsService, private route: ActivatedRoute, private router: Router,
              private auth: AuthshopService, private app: AppComponent, private translate: TranslateService) {
    util.getLocation.subscribe(data => {
      console.log('headerrr', data);
      this.location = data['zip_code'][0];
      this.lat = data['customer_lat'];
      this.lng = data['customer_lng'];
      console.log('lat', this.lat);
      console.log('lng', this.lng);
    });

    util.modeVideo.subscribe(data => {
      this.modeOffset = data;
    });

    util.numberShopping.subscribe(data => {
      if (data) {
        this.number_items = data;
      }
    });

    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });


  }

  scrollTop = (aid) => {
    const aTag = $(`#${aid}`);
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');

  };

  searchFocus = () => {
    console.log('here');
  };

  openZip = () => this.app.open();

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.location = this.util.getZipCookie();

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const _data = data.state.root.firstChild.data;
        this.header = (_data['header']);
        this.subMenu = (_data['subMenu']);
      }
    });
  }

  public editLenguaje(lang) {
    console.log('clickee idioma');
    this.activeLang = lang;
    this.translate.use(lang);
  }


}
