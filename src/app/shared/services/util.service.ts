import Swal from 'sweetalert2';
import {Injectable, EventEmitter, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {settings} from '../settings';

declare var $: any;

@Injectable({
  providedIn: 'root'
})


export class UtilsService {
  cookie_zip_code = null;
  _settings = settings;
  @Output() getLocation: EventEmitter<any> = new EventEmitter();
  @Output() refreshShopping: EventEmitter<any> = new EventEmitter();
  @Output() numberShopping: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) {
  }

  openSnackBar(message: string, action: string, duration: number = 5000) {
    console.log(message, action);
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

  checkH = (p = null, router = null) => {
    const _a = this._settings[p].find(a => a === router);
    return !!(_a);
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

  emitShopping = () => {
    return {
      a: 1
    };
  };
}
