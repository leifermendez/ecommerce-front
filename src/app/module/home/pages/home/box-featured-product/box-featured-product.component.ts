import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css']
})
export class BoxFeaturedProductComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any;
  public optionsOws: any;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.optionsOws = {items: 4, dots: false, navigation: true, autoplay: false};


    this.rest.get('/rest/products')
      .then((response: any) => {
        if (response['status'] === 'success') {

          response = response['data'];
          this.data = response['items']['data'];
          console.log(this.data);
        }
      });
  }

}
