import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';
import {CookieService} from 'ngx-cookie-service';
import {UtilsService} from '../../../../shared/services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public data: any = null;
  public type: any = null;


  constructor(private auth: AuthshopService,
              private router: Router) {
  }

  ngOnInit() {
    const _user = this.data = this.auth.getCurrentUser();
    if (_user['role'] === 'user') {
      this.router.navigateByUrl('/purchases');
    } else {
      this.router.navigateByUrl('/sales');
    }
  }

}
