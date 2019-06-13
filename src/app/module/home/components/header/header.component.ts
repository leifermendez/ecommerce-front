import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../shared/services/util.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  header = false;
  subMenu = false;
  public user_data: any = null;
  public number_items = 0;
  public activeLang = 'es';
  constructor(private util: UtilsService, private route: ActivatedRoute, private router: Router,
              private auth: AuthshopService, private app: AppComponent, private translate: TranslateService) {
    util.getLocation.subscribe(data => {
      this.location = data[0];
    });

    util.numberShopping.subscribe(data => {
      if (data) {
        this.number_items = data;
      }
    });

    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });

    this.router.events.subscribe(() => {
      this.header = this.util.checkH('header', this.router.url);
      this.subMenu = this.util.checkH('subMenu', this.router.url);
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
  }
  public editLenguaje(lang) {
    console.log('clickee idioma');
    this.activeLang = lang;
    this.translate.use(lang);
  }


}
