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
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
      ])
    ])
  ]
})
export class BoxShopsComponent implements OnInit {
  @ViewChild('owlCategories') owlElement: OwlCarousel;
  @Input() items: any = 4;
  public data: any = [];
  public optionsOws: any;
  public loading = false;

  constructor(private rest: RestService, private util: UtilsService) {
    util.getLocation.subscribe(data => {
      this.loadData();
    });
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
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/shop?timestamp=${Date.now()}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {

          response = response['data'];
          this.data = response['data'];
          console.log('--', this.data);
        }
      });
  };

}
