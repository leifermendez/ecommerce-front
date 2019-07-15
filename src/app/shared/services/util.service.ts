import Swal from 'sweetalert2';
import {Injectable, EventEmitter, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {settings} from '../settings';
import {BsModalService} from 'ngx-bootstrap';

declare var $: any;

@Injectable({
  providedIn: 'root'
})


export class UtilsService {
  cookie_zip_code = null;
  _settings = settings;
  @Output() getLocation: EventEmitter<any> = new EventEmitter();
  @Output() refreshShopping: EventEmitter<any> = new EventEmitter();
  @Output() refreshShoppingData: EventEmitter<any> = new EventEmitter();
  @Output() numberShopping: EventEmitter<any> = new EventEmitter();
  @Output() switchBar: EventEmitter<any> = new EventEmitter();
  @Output() updateProfile: EventEmitter<any> = new EventEmitter();
  @Output() modeVideo: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService,
              private modalService: BsModalService,) {
  }


  closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }


  openModalSnack = (message: string,
                    action: string,
                    details: any = null,
                    duration: number = 5000,) => {
    if (action === 'success') {
      Swal.fire({
        type: 'success',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else if (action === 'error') {
      Swal.fire({
        type: 'error',
        title: message,
        text: details,
        footer: '<a href>Why do I have this issue?</a>'
      });
    }

  };

  openConfirm = (title = null) => new Promise((resolve, reject) => {
    Swal.fire({
      title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        );
        resolve(true);
      } else {
        reject(false);
      }
    }).catch(e => reject(false));
  });

  openSnackBar(message: string, action: string, duration: number = 5000) {

    if (action === 'success') {
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else if (action === 'error') {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    }

  }

  //   /(\/shop\/edit\/.*)/i;

  checkH = async (p = null, router = null) => {
    let _b = false;
    const _b1 = this._settings[p].map(b => {
      const expresion = new RegExp(b, 'i');
      _b = (router.match(expresion));
      return _b;
    });
    return await Promise.all(_b1);
  };

  getZipCookie = () => {
    this.cookie_zip_code = this.cookieService.get('_location_zip_code');
    const _cookie_data = (this.cookie_zip_code && JSON.parse(this.cookie_zip_code)) ?
      JSON.parse(this.cookie_zip_code) : null;
    return _cookie_data;
  };

  showTool = () => $('html body .overlay-tooltip').show();

  hiddenTool = () => $('html body .overlay-tooltip').hide();

  closeAllTooltip = () => $('html body .button-hide-tooltip').click();

  clickElement = (e) => $(`html body ${e}`).click();

  slug = (a) => {
    let str = a;
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
  };

  emitShopping = () => {
    return {
      a: 1
    };
  };
}
