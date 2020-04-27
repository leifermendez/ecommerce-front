import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {UtilsService} from '../../../../shared/services/util.service';
import {RestService} from '../../../../shared/services/rest.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BannerComponent} from './banner/banner.component';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public computer: any = false;
  public mobile: any = false;
  public tablet: any = false;
  public modeOffset:any = false;
  public images: any;
  public data: any;
  public optionsGallery: any;
  bsModalRef: BsModalRef;
  constructor(private rest: RestService, private modalService: BsModalService,
    private route: ActivatedRoute, private util: UtilsService,
    private deviceService: DeviceDetectorService,) {
      this.computer = this.deviceService.isDesktop();
      this.mobile = this.deviceService.isMobile();
      this.tablet = this.deviceService.isTablet();
      util.modeVideo.subscribe(data => {
        this.modeOffset = data;
      });
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

    // this.rest.get('/rest/banners')
    //   .then((response: any) => {
    //     if (response['status'] === 'success') {
    //       response = response['data'];
    //       this.data = response['data'];
    //     }
    //   });
  }

}
