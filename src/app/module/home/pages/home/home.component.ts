import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../shared/services/rest.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BannerComponent} from './banner/banner.component';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public images: any;
  public data: any;
  public optionsGallery: any;
  bsModalRef: BsModalRef;
  constructor(private rest: RestService, private modalService: BsModalService,
    private route: ActivatedRoute) {
  }
  modal() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(BannerComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnInit() {
    this.route
    .data
    .subscribe(v => console.log(v));
    this.optionsGallery = {items: 1, dots: false, navigation: true, autoplay: true};
    this.images = ['1', '2', '3'];

    this.rest.get('/rest/banners')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
          console.log('----->', this.data);
        }
      });
  }

}
