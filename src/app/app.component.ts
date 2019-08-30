import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ZipLocationComponent } from './module/home/components/zip-location/zip-location.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './shared/services/util.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalWarningComponent } from './module/home/components/modal-warning/modal-warning.component';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import * as moment from 'moment';
import {
  title as meta_title,
  description as meta_description,
  keywords as meta_keywords
} from '../main-config';
import { ReferredComponent } from './module/home/components/referred/referred.component';
import { AuthshopService } from './module/auth/authshop.service';
import { Intercom } from 'ng-intercom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apatxee';

  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };
  cookie_zip_code = null;
  loading = false;
  public activeLang = 'es';
  public tawkId = environment.tawk;
  public computer: any = true;
  nowCookies = moment().add(6, 'days').toDate();

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any,
    private modalService: BsModalService,
    private util: UtilsService,
    private auth: AuthshopService,
    public intercom: Intercom,
    private route: ActivatedRoute,
    private router: Router, 
    private translate: TranslateService,
    private cookieService: CookieService,
    private meta: Meta,
    private titleService: Title,
    private deviceService: DeviceDetectorService) {

    router.events.subscribe((event: RouterEvent) => {
      this.util.modeVideo.emit(false);
      this.navigationInterceptor(event);
    });

    this.cookie_zip_code = this.cookieService.get('_location_zip_code');
    this.translate.setDefaultLang(this.activeLang);

    /** METAS */

    this.titleService.setTitle(meta_title);

    this.meta.updateTag({
      name: 'description',
      content: meta_description
    });

    this.meta.updateTag({
      name: 'keywords',
      content: meta_keywords
    });

    /** METAS */

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('heheh');
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });

    this.route.queryParams.subscribe(params => {

      if (params && params.ref) {
        const promo_cookie = this.cookieService.get('_p_cookie');
        if(!promo_cookie){
          this.cookieService.set(
            '_p_cookie',
            JSON.stringify({"_t":this.nowCookies}),
            this.nowCookies,
            '/'
          );
        }
        
        const _user_data = this.auth.getCurrentUser();
        if (!_user_data) {
          this.openReferred();
        }
      }
    });
  }


  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ZipLocationComponent,
      Object.assign({ initialState }, {
        class: 'gray modal-lg top-modal box-shadow-modal responsive'
      },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  openReferred() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ReferredComponent,
      Object.assign({ initialState }, {
        class: 'gray modal-lg top-modal box-shadow-modal responsive'
      },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  openWarning = () => {
    const initialState = {
      ignoreBackdropClick: true,
    };

    this.modalRef = this.modalService.show(
      ModalWarningComponent,
      Object.assign({ initialState }, {
        class: 'gray modal-lg top-modal box-shadow-modal m-0'
      },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  };

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }


  ngOnInit() {
    this.intercom.boot({
      app_id: environment.intercom,
      // Supports all optional configuration.
      widget: {
        "activator": "#intercom" 
      }
    });
    this.computer = this.deviceService.isDesktop();
    if (!this.computer) {
      //this.openWarning();
    }
    const _location = this.localStorage.getItem('_location');
    if (!_location) {
      if (!this.cookie_zip_code) {
        //this.open();
      }
    }
  }
}
