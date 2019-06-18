import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../../auth/authshop.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() type = null;
  public data: any = null;
  public show_toggle:any = false;

  constructor(private auth: AuthshopService,
    private cookieService: CookieService) {
  }

  swtich = (type) => this.type = type

  ngOnInit() {
    this.show_toggle = this.cookieService.get('_wizard_dashboard');
    this.data = this.auth.getCurrentUser();
  }

}
