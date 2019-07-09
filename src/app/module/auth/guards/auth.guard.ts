import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {UtilsService} from '../../../shared/services/util.service';
import {RestService} from '../../../shared/services/rest.service';
import {AuthshopService} from '../authshop.service';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private auth: AuthshopService,
              private router: Router,
              private utils: UtilsService,
              private cookieService: CookieService,
              private rest: RestService) {
  }

  canLoad(route: Route): Promise<boolean> {
    return this.verify();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }

  verify(): Promise<boolean> {

    return new Promise<boolean>(((resolve, reject) => {
      const _current_user = this.auth.getCurrentUser();
      if (!_current_user) {
        this.router.navigate(['/login', {}]);
        reject(false);
      } else {
        resolve(true);
      }

      this.auth.validate().then((response => {
        resolve(true);
      }).bind(this)).catch((error) => {
        reject(false);
      });

    }).bind(this));
  }
}
