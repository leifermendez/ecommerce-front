import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../../../../../../shared/services/rest.service';

@Component({
  selector: 'app-data-gallery-product',
  templateUrl: './data-gallery-product.component.html',
  styleUrls: ['./data-gallery-product.component.css']
})
export class DataGalleryProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  public loading = false;
  public filesReady: any;
  public responseData: any = [];

  constructor(private httpClient: HttpClient, private rest: RestService) {
  }

  ngOnInit() {
  }

  uploadSave = () => {
    this.loading = true;
    this.filesReady.forEach(file => {
      const formData = new FormData();
      formData.append('attached', file);
      formData.append('type_file', 'image');

      this.httpClient.post<any>(
        `${this.rest.url}/rest/media`, formData,
        {headers: this.rest.getHeadersMedia()})
        .subscribe(
          (res) => {
            this.loading = false;
            // this.responseData.push(res['data']['id']);
            this.updateItem(res['data']['id']);
          },
          (err) => {
            this.loading = false;
          }
        );
    });
  };

  updateItem = (id, variation = null) => {
    const _data = {
      'attached_id': id,
      'variation_product_id': variation,
      'product_id': this.id
    };

    this.rest.post(`/rest/product-media`, _data)
      .then((response: any) => {
        console.log(response);
      });
  };

  onFilesAdded(files: File[]) {

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
      };
      this.filesReady = files;
    });
  }

}
