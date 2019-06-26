import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-box-shops',
  templateUrl: './box-shops.component.html',
  styleUrls: ['./box-shops.component.css']
})
export class BoxShopsComponent implements OnInit {
  @ViewChild('owlCategories') owlElement: OwlCarousel;
  public data: any;
  public optionsOws: any;
  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.optionsOws = {items: 5, dots: false, navigation: true, autoplay: false};
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.rest.get('/rest/shop')
      .then((response: any) => {
        if (response['status'] === 'success') {

          response = response['data'];
          this.data = response['data'];
          console.log(this.data);
        }
      });
  }

}
