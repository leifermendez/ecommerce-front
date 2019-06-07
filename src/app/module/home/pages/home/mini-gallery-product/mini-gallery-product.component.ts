import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-mini-gallery-product',
  templateUrl: './mini-gallery-product.component.html',
  styleUrls: ['./mini-gallery-product.component.css']
})
export class MiniGalleryProductComponent implements OnInit {
  @Input() data: any;
  @ViewChild('owlMiniGallery') owlElement: OwlCarousel;

  public optionsOws: any;

  constructor() {
  }

  ngOnInit() {
    this.optionsOws = {items: 1, dots: false, navigation: true, autoplay: false};
    this.data = [1]
    console.log('-->', this.data);
  }

}
