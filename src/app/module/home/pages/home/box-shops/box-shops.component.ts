import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {OwlCarousel} from 'ngx-owl-carousel';
import {UtilsService} from '../../../../../shared/services/util.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-box-shops',
  templateUrl: './box-shops.component.html',
  styleUrls: ['./box-shops.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class BoxShopsComponent implements OnInit {
  @ViewChild('owlCategories') owlElement: OwlCarousel;
  @Input() items: any = 4;
  public data: any;
  public optionsOws: any;
  public loading = false;

  constructor(private rest: RestService, private util: UtilsService) {
  }

  ngOnInit() {
    this.optionsOws = {
      dots: false,
      navigation: true,
      autoplay: false,
      items: this.items,
      margin: 5,
      autoWidth: true,
    };
    this.loading = true;
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.rest.get('/rest/shop')
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {

          response = response['data'];
          this.data = response['data'];
          console.log(this.data);
        }
      });
  }

}
