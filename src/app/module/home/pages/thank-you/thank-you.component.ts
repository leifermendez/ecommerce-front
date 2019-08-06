import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('.2s ease-in')
      ]),
      transition(':leave', [
        animate('.2s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
      ])
    ])
  ]
})
export class ThankYouComponent implements OnInit {
  public referer: any = null;

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['uuid']) {
        this.referer = params['uuid'];
        this.util.setNumberShopping.emit(0);
      }
    });
  }

  ngOnInit() {
  }

}
