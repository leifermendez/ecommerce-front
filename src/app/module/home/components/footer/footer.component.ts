import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';

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

  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const _data = data.state.root.firstChild.data;
        this.footer = (_data['footer'])
      }
    });
  }

}
