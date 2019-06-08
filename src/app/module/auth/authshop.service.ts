import { EventEmitter, Injectable, Output } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { UtilsService } from '../../shared/services/util.service';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class AuthshopService {
  private _currentUser: UserModel;
  public waiting: boolean;
  @Output() getLoggedInData: EventEmitter<any> = new EventEmitter();

  constructor(private rest: RestService,
    private utils: UtilsService,
    private router: Router
  ) {
    if (this.localtoken && this.rest.headers) {
      this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + this.localtoken);
      this.rest.headers = this.rest.headers.set('deviceInfo', '{"language_local":"en-US","uuid":"unknown","os":"Web",' +
        '"os_version":"unknown","device":"unknown","carrier":"unknown"}');
    } else if (!this.rest.headers) {
      console.error('headers object is not available!');
    }

  }

  public login(email: string, password: string, name: string = null): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.waiting = true;
      this.rest.post('/auth', { email, password, name })
        .then(((response: any) => {
          console.log(response)
          if (response.data) {
            const token = response.data['token'];
            if (token) {
              this._currentUser = response.data;
              this.emitlogin(this._currentUser);
              localStorage.setItem('currentUser', JSON.stringify(response.data));
              this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + token);
              resolve(true);
            }
            resolve(false);
          } else {
            resolve(false);
          }
          this.waiting = false;
        }).bind(this))
        .catch((e) => {
          this.waiting = false;
          reject(e);
        });
    }).bind(this));
  }

  public logout(): void {
    localStorage.clear();
    this.waiting = true;
    this.cleanSession();
    this.utils.openSnackBar('sesión finalizada', 'success');
  }

  public validate(): Promise<string> {
    return new Promise<string>(((resolve, reject) => {
      this.waiting = true;
      if (this.rest.headers.has('Authorization')) {
        this.rest.get('/oauth/session').then(((response: any) => {
          this._currentUser = response.data;
          this.waiting = false;
          console.log('Second Validation');
          resolve(response.message);
        }).bind(this)).catch((error) => {
          this.cleanSession();
          this.router.navigateByUrl('/auth/login');
          this.waiting = false;
          reject(error.message);
        });
      } else {
        this.cleanSession();
        this.router.navigateByUrl('/auth/login');
      }
    }).bind(this));
  }

  private get localtoken(): string {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj) {
      return obj.token;
    }
    return null;
  }

  public get isAuthenticated(): boolean {
    return !!this.localtoken && this.rest.headers.has('Authorization');
  }

  public get user(): UserModel {
    return this._currentUser;
  }


  public getCurrentUser() {
    const _current = localStorage.getItem('currentUser');
    const _parseCurrent = JSON.parse(localStorage.getItem('currentUser'));
    const _userData = (_current && _parseCurrent) ? JSON.parse(localStorage.getItem('currentUser')) : null;
    return _userData;
  }

  public emitlogin(data) {
    this.getLoggedInData.emit(data);
  }

  public cleanSession() {
    this._currentUser = null;
    this.rest.headers.delete('Authorization');
    localStorage.removeItem('currentUser');
    this.getLoggedInData.emit('logout');
  }
}
