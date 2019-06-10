import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UtilsService} from '../../../../shared/services/util.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: any = false;

  constructor(private router: Router,
              private util: UtilsService) {
    this.router.events.subscribe(() => {
      this.footer = this.util.checkFooter(this.router.url);
    });
  }


  ngOnInit() {

  }

}
