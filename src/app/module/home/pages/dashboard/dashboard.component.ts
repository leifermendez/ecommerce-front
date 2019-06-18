import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public data: any = null;
  public type: any = null;
  public show_toggle:any = false;

  constructor(private auth: AuthshopService,
    private cookieService: CookieService) {
  }

  skip_welcome = (type) => {
    this.type = type;
    this.cookieService.set(
      '_wizard_dashboard',
      '1'
    );
  };

  ngOnInit() {
    this.show_toggle = this.cookieService.get('_wizard_dashboard');
    this.data = this.auth.getCurrentUser();
    console.log('----->', this.data);
  }

}
