import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {UtilsService} from '../../../shared/services/util.service';
import {RestService} from '../../../shared/services/rest.service';
import {AuthshopService} from '../authshop.service';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private auth: AuthshopService,
              private router: Router,
              private utils: UtilsService,
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
    console.log(' Verify Called');
    return new Promise<boolean>(((resolve, reject) => {
      if (!this.auth.isAuthenticated) {
        this.router.navigate(['/login', {}]);
        reject(false);
      } else {
        if (!this.auth.user) {
          this.auth.validate().then((response => {
            // this.utils.openSnackBar('Validado con exito', 'success');
            resolve(true);
          }).bind(this)).catch((error) => {
            reject(false);
          });
        } else {
          console.log('Success');
          resolve(true);
        }
      }
    }).bind(this));
  }
}
