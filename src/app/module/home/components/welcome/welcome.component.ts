import {Component, OnInit} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {BsModalRef} from 'ngx-bootstrap';
import {CookieService} from 'ngx-cookie-service';

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
              private bsModalRef: BsModalRef) {
  }

  switch = (type) => {
    this.util.switchBar.emit(type);
    this.cookieService.set(
      '_wizard_dashboard',
      type
    );
    this.bsModalRef.hide();
  };

  ngOnInit() {
    this.data = this.auth.getCurrentUser();
  }

}
