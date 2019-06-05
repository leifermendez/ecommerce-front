import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-box-featured-product',
  templateUrl: './box-featured-product.component.html',
  styleUrls: ['./box-featured-product.component.css']
})
export class BoxFeaturedProductComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  public data: any;
  public optionsOws: any;

  constructor() {
  }

  ngOnInit() {
    this.optionsOws = {items: 4, dots: false, navigation: true, autoplay: false};
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

}
