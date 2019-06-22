import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';
import {CookieService} from 'ngx-cookie-service';
import {UtilsService} from '../../../../shared/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public data: any = null;
  public type: any = null;
  public show_toggle: any = false;

  constructor(private auth: AuthshopService,
              private cookieService: CookieService,
              private util: UtilsService) {
  }

  ngOnInit() {

  }

}
