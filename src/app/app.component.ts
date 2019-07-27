import {Component, OnInit, Inject} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ZipLocationComponent} from './module/home/components/zip-location/zip-location.component';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from './shared/services/util.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ModalWarningComponent} from './module/home/components/modal-warning/modal-warning.component';
import {LOCAL_STORAGE, WINDOW} from '@ng-toolkit/universal';
import {Title, Meta} from '@angular/platform-browser';
import {
  title as meta_title,
  description as meta_description,
  keywords as meta_keywords
} from '../main-config';

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
  public computer: any = true;

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any,
              private modalService: BsModalService,
              private util: UtilsService,
              private router: Router, private translate: TranslateService,
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

  }


  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ZipLocationComponent,
      Object.assign({initialState}, {
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
      Object.assign({initialState}, {
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
    this.computer = this.deviceService.isDesktop();
    if (!this.computer) {
      //this.openWarning();
    }
    const _location = this.localStorage.getItem('_location');
    if (!_location) {
      if (!this.cookie_zip_code) {
        this.open();
      }
    }
  }
}
