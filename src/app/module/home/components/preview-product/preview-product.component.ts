import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-preview-product',
  templateUrl: './preview-product.component.html',
  styleUrls: ['./preview-product.component.css']
})
export class PreviewProductComponent implements OnInit {
  public data: any = {
    description: null,
    name: null,
    cover_image: {
      medium: null
    },
    short_description: null,
    categories: {
      name: null
    },
    variations: {
      item: []
    }
  }
  constructor(private util: UtilsService, ) {
    this.util.previewP.subscribe(data => {
      if (data) {
        if (data['categories'] && (Array.isArray(data['categories']))) {
          data['categories'] = data['categories'][0];
          console.log('neww data', data)
        }
        this.data = { ...this.data, ...data }
      }
    });
  }

  ngOnInit() {
  }

}
