import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../shared/services/util.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthshopService} from '../../../auth/authshop.service';


declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public location: any = null;
  header = false;
  public user_data: any = null;

  constructor(private util: UtilsService, private route: ActivatedRoute, private router: Router,
              private auth: AuthshopService) {
    util.getLocation.subscribe(data => {
      this.location = data[0];
    });

    auth.getLoggedInData.subscribe(data => {
      this.user_data = data;
    });

    this.router.events.subscribe(() => {
      this.header =  this.util.checkHeader(this.router.url);
    });
  }

  scrollTop = (aid) => {
    const aTag = $(`#${aid}`);
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');

  };

  searchFocus = () => {
    console.log('here');
  };

  ngOnInit() {
    this.user_data = this.auth.getCurrentUser();
    this.location = this.util.getZipCookie();
  }

}
