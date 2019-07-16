import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilsService} from './util.service';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers: HttpHeaders;
  location_zip = '';
  public lat = '';
  public lng = '';
   public readonly url: string = 'https://ecommerce-apatxee-v2.appspot.com/api/1.0';
  //public readonly url: string = 'http://127.0.0.1:8000/api/1.0';

  constructor(public http: HttpClient,
              private router: Router,
              public utils: UtilsService,
              private cookieService: CookieService,
  ) {

  }

  getHeaders = () => {
    const _cookie_data = this.cookieService.get('_location_zip_code');
    this.location_zip = (_cookie_data && JSON.parse(_cookie_data)) ?
      JSON.parse(_cookie_data) : null;
    this.location_zip = (this.location_zip && this.location_zip['zip_code']) ?
      this.location_zip['zip_code'] : '';
    this.lat = this.cookieService.get('customer_lat') ? this.cookieService.get('customer_lat') : null;
    this.lng = this.cookieService.get('customer_lng') ? this.cookieService.get('customer_lng') : null;
    const timezone = new Date().getTimezoneOffset();
    // @ts-ignore
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'TIME-ZONE': `${timezone}`,
      'LOCATION-ZIP': (this.location_zip) ? this.location_zip : '',
      'LAT': (this.lat) ? this.lat : '',
      'LNG': (this.lng) ? this.lng : '',
      'Authorization': `Bearer ${this.localtoken}`
    });
    return this.headers;
  };

  getHeadersMedia = () => {
    const _cookie_data = this.cookieService.get('_location_zip_code');
    this.location_zip = (_cookie_data && JSON.parse(_cookie_data)) ?
      JSON.parse(_cookie_data) : null;
    this.location_zip = (this.location_zip && this.location_zip['zip_code']) ?
      this.location_zip['zip_code'] : '';
    const timezone = new Date().getTimezoneOffset();
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'TIME-ZONE': `${timezone}`,
      'LOCATION-ZIP': this.location_zip,
      'Authorization': `Bearer  ${this.localtoken}`
    });
    return this.headers;
  };

  private get localtoken(): string {
    const obj = this.cookieService.get('_currentUser');
    if (obj && JSON.parse(obj)) {
      return JSON.parse(obj)['token'];
    } else {
      return null;
    }
  }

  get(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.get(this.getUrl(endpoint, params), {headers: this.getHeaders()}).toPromise());
  }

  post(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.post(this.getUrl(endpoint, params), body, {headers: this.getHeaders()}).toPromise());
  }

  postMedia(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.post(this.getUrl(endpoint, params), body,
      {headers: this.getHeadersMedia()}).toPromise());
  }

  putMedia(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.put(this.getUrl(endpoint, params), body,
      {headers: this.getHeadersMedia()}).toPromise());
  }

  put(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.put(this.getUrl(endpoint, params), body, {headers: this.getHeaders()}).toPromise());
  }

  delete(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.delete(this.getUrl(endpoint, params), {headers: this.getHeaders()}).toPromise());
  }

  public getUrl(endpoint: string, params?: IUrlParams): string {
    return this.url
      + ''
      + (endpoint || '/')
      + this.parseParams(params);
  }

  private parseParams(params: IUrlParams): string {
    let parsed = '';
    if (params) {
      Object.keys(params).forEach((k, i) => {
        parsed += (i == 0) ? '?' : '&';
        parsed += k + '=' + params[k];
      });
    }
    return parsed;
  }

  private check(requestPromise: Promise<object>): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      requestPromise.then(response => {
        resolve(response);
      }).catch(((err: HttpErrorResponse | any) => {
        switch (err.status) {
          case 401:
            // this.utils.openSnackBar(err.error.message, '');
            // this.router.navigateByUrl('/home');
            break;
          default:
            // this.utils.openSnackBar(err.error.message, '');
            break;
        }
        // this.utils.openSnackBar(err.error.message, '');
        reject(err);
      }).bind(this));
    });
  }
}

interface IUrlParams {
  [key: string]: string | number | boolean;
}
