import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';

@Component({
  selector: 'app-gallery-single',
  templateUrl: './gallery-single.component.html',
  styleUrls: ['./gallery-single.component.css']
})
export class GallerySingleComponent implements OnInit {
  @ViewChild('owlFeatured') owlElement: OwlCarousel;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Input() images: any = [];
  public optionsOws: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {
  }

  changeCover = (a) => this.callback.emit(a);

  ngOnInit() {

    this.images = [
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      },
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      },
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      },
      {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      }
      , {
        small: 'https://via.placeholder.com/400',
        medium: 'https://via.placeholder.com/400',
        big: 'https://via.placeholder.com/400'
      }
    ];
  }

}
