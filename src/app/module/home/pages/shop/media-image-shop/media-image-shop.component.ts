import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileItem, HttpClientUploadService} from '@wkoza/ngx-upload';
import {RestService} from '../../../../../shared/services/rest.service';
import {AuthshopService} from '../../../../auth/authshop.service';

@Component({
  selector: 'app-media-image-shop',
  templateUrl: './media-image-shop.component.html',
  styleUrls: ['./media-image-shop.component.css']
})
export class MediaImageShopComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() preview = null;

  constructor(public  uploader: HttpClientUploadService,
              private rest: RestService,
              private auth: AuthshopService) {
  }

  ngOnInit() {
    this.uploader.queue = [];

    this.uploader.onCancel$.subscribe(
      (data: FileItem) => {
        console.log('file canceled: ' + data.file.name);

      });

    this.uploader.onDropError$.subscribe(
      (err) => {
        console.log('error during drop action: ', err);
      });

    this.uploader.onProgress$.subscribe(
      (data: any) => {
        console.log('upload file in progree: ', data.progress);

      });

    this.uploader.onSuccess$.subscribe(
      (data: any) => {
        const _file = this.uploader.queue[0];
        // _file.remove();
        const _data = data['body']['data'];
        this.callback.emit(_data);
        console.log(`upload file successful:  ${data.item} ${data.body} ${data.status} ${data.headers}`);
      }
    );


    this.uploader.onAddToQueue$.subscribe(
      () => {
        const _file = this.uploader.queue[0];
        if (_file) {
          this.preview = null;
          this.upload(_file);
        }
      }
    );
  }


  upload(item: FileItem) {
    item['alias'] = 'attached';
    item.formData.append('type_file', 'image');
    item.upload({
        method: 'POST',
        url: `${this.rest.url}/rest/media`
      },
      {headers: this.rest.getHeadersMedia()});
  }

}
