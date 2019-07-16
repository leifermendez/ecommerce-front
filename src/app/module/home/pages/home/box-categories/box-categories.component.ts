import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-box-categories',
  templateUrl: './box-categories.component.html',
  styleUrls: ['./box-categories.component.css'],
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
export class BoxCategoriesComponent implements OnInit {


  @ViewChild('owlCategories') owlElement: OwlCarousel;
  public data: any;
  public optionsOws: any;
  public loading = false;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.optionsOws = {items: 6, dots: false, navigation: true, autoplay: false};
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.loading = true;
    this.rest.get('/rest/categories')
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          response = response['data'];
          this.data = response['data'];
          console.log(this.data);
        }
      });
  }

}
