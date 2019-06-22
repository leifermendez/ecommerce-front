import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {OwlCarousel} from 'ngx-owl-carousel';
import { NgxEpicVideoPlayerComponent } from 'ngx-epic-video-player';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild('evp') evp: NgxEpicVideoPlayerComponent;
  public data: any;
  public optionsGallery: any;

  constructor(private rest: RestService) {
  }


  ngOnInit() {
    this.optionsGallery = {items: 1, dots: false, navigation: true, autoplay: true, loop: true};
    this.rest.get('/rest/banners')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
        }
      });
  }

  play = () => this.evp.play();

}
