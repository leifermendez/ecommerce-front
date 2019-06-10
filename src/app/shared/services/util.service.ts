import Swal from 'sweetalert2';
import {Injectable, EventEmitter, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {settings} from '../settings';

@Injectable({
  providedIn: 'root'
})


export class UtilsService {
  cookie_zip_code = null;
  _settings = settings;
  @Output() getLocation: EventEmitter<any> = new EventEmitter();

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

  checkHeader = (router = null) => {
    const _a = this._settings.header.find(a => a === router);
    return !!(_a);
  };


  checkFooter = (router = null) => {
    const _a = this._settings.footer.find(a => a === router);
    return !!(_a);
  };

  getZipCookie = () => {
    this.cookie_zip_code = this.cookieService.get('_location_zip_code');
    const _cookie_data = (this.cookie_zip_code && JSON.parse(this.cookie_zip_code)) ?
      JSON.parse(this.cookie_zip_code) : null;
    return _cookie_data;
  };
}
