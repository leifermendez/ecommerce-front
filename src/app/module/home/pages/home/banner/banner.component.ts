import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  public data: any;
  public optionsGallery: any;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.optionsGallery = {items: 1, dots: false, navigation: true, autoplay: true};
    this.rest.get('/rest/banners')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
        }
      });
  }

}
