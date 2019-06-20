import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../../auth/authshop.service';
import {CookieService} from 'ngx-cookie-service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() type = null;
  public data: any = null;
  public icon = 'toggle-on';

  constructor(private auth: AuthshopService,
              private cookieService: CookieService,
              private util: UtilsService,
              private router: Router) {

    this.util.switchBar.subscribe(data => {
      this.type = data;
    });

    this.util.updateProfile.subscribe(data => {
      this.data = this.auth.getCurrentUser();
      console.log('------', this.data);
    });

  }

  switch = () => {
    this.type = (this.type === 'user') ? 'shop' : 'user';
    this.cookieService.set(
      '_wizard_dashboard',
      this.type
    );
    this.router.navigateByUrl('/profile');
    this.util.switchBar.emit(this.type);
  };

  ngOnInit() {

    this.type = (this.cookieService.get('_wizard_dashboard')) ?
      this.cookieService.get('_wizard_dashboard') : 'user';

    this.util.switchBar.emit(this.type);
    this.data = this.auth.getCurrentUser();
  }

}
