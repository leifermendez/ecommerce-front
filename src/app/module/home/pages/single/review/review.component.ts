import { Component, OnInit, Input } from '@angular/core';
import { Lightbox, LightboxEvent, LightboxConfig, IEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { RestService } from '../../../../../shared/services/rest.service';
import { UtilsService } from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  @Input() id: any = [];
  private _album: any = [];
  private _subscription: Subscription;
  public loading = false;
  public data: any = null;

  constructor(
    private rest: RestService,
    private util: UtilsService,
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig) {


    this._lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
    this.loadData();
  }

  galleryImg = (data) => {
    /*for (let i = 1; i <= 4; i++) {
      const src = 'https://storage.googleapis.com/media-ecommerce-alterhome/public/upload/products/large_rXsGyKUGc1WqG62CX0v22UntfK7k1q3euGh.jpg';
      const caption = '';
      const thumb = 'https://storage.googleapis.com/media-ecommerce-alterhome/public/upload/products/small_rXsGyKUGc1WqG62CX0v22UntfK7k1q3euGh.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      console.log('--->', album)
      this._album.push(album);
    }*/

    const src = data.image_comment;
    const caption = '';
    const thumb = data.image_comment;
    const album = {
      src: src,
      caption: caption,
      thumb: thumb
    };

  
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/comments?filters=product_id,=,${this.id}`)
      .then((response: any) => {
        if (response.status === 'success') {
          this.data = response.data['data'];
          this.data.map(a => {
            
          })
        }
      })
      .catch(err => {
        this.loading = false;
      });
  }
  open(index: any): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    let _album = []
    const re = /small_/gi;
    const caption = '';
    const thumb = index.image_comment;
    let src = index.image_comment.replace(re, "large_");

    const album = {
      src: src,
      caption: caption,
      thumb: thumb
    };

    console.log('----',album)
    _album.push(album)

    this._lightbox.open(_album, 0, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: true
    });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }

}
