import {Component, OnInit} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {BsModalRef} from 'ngx-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public data: any = false;

  constructor(private auth: AuthshopService,
              private cookieService: CookieService,
              private util: UtilsService,
              private bsModalRef: BsModalRef,
              private router: Router) {
  }

  switch = (type) => {
    this.util.switchBar.emit(type);
    this.cookieService.set(
      '_wizard_dashboard',
      type
    );
    if (type === 'shop') {
      this.router.navigateByUrl('/shop');
    }
    this.bsModalRef.hide();
  };

  ngOnInit() {
    this.data = this.auth.getCurrentUser();
  }

}
