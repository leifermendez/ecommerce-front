import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {OwlCarousel} from 'ngx-owl-carousel';
import {NgxEpicVideoPlayerComponent} from 'ngx-epic-video-player';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, AfterViewInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild('evp') evp: NgxEpicVideoPlayerComponent;
  public data: any;
  public optionsGallery: any;
  public modeOffset: any = false;
  public initialized: any = false;
  public resized: any = false;
  public videoApi: any = [];
  api: VgAPI;

  constructor(private rest: RestService, private util: UtilsService,
              private elem: ElementRef) {
    util.modeVideo.subscribe(data => {
      this.modeOffset = data;
    });
  }

  modeVideo = (a = false) => this.util.modeVideo.emit(a);

  ngOnInit() {
    this.optionsGallery = {
      items: 1,
      dots: false, navigation: true, autoplay: false, loop: false,
      onInitialized: this.onInitialized.bind(this),
      onTranslated: this.onChanged.bind(this),
      onRefreshed: this.onChanged.bind(this),
      onTranslate: this.modeOffset = false,
    };
    this.rest.get('/rest/banners')
      .then((response: any) => {
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
        }
      });
  }

  ngAfterViewInit() {
    // you'll get your through 'elements' below code

  }

  onPlayerReady(api: VgAPI, index = null) {
    console.log('read', typeof index);
    if ((typeof index) === 'number') {
      console.log('entre');
      this.videoApi[index] = api;
      this.videoApi[index].getDefaultMedia().subscriptions.loadedMetadata.subscribe(
        () => {
          this.videoApi[index].getDefaultMedia()['volume'] = 0;
          console.log(this.videoApi[index]);
        });
    }
  }

  onResized = () => this.resized = true;

  onInitialized = () => this.initialized = true;

  onChanged = (a) => {
    if (this.initialized) {
      const _this = this;
      let elements = this.elem.nativeElement.querySelectorAll('.rev_slider .owl-stage-outer .owl-stage .active .item');
      setTimeout(function () {

        elements = (elements && elements[0]) ? elements[0] : null;
        if (elements && elements.dataset) {
          if (elements.dataset['mediaType'] === 'video') {
            const index = elements.dataset['index'];
            console.log('aui', _this.videoApi);
            _this.videoApi[index].play();
            _this.modeVideo(true);
          } else {
            if (_this.videoApi) {
              _this.videoApi.map(a => a.pause());
            }
            _this.modeVideo(false);

          }
        }
      }, 800);
    }
  };

  play = () => this.evp.play();

}
