import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileItem, HttpClientUploadService} from '@wkoza/ngx-upload';
import {RestService} from '../../../../../shared/services/rest.service';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css']
})
export class AvatarUploadComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() preview = null;

  constructor(public  uploader: HttpClientUploadService,
              private rest: RestService) {
  }

  ngOnInit() {
    this.uploader.queue = [];

    if (this.preview) {
      const _image = this.makeThumbnail(this.preview);
      // this.uploader.queue.push();
    }

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
        _file.remove();
        this.callback.emit(data['body']);
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

  makeThumbnail(url) {
    const reader = new FileReader();
    // read the image file as a data URL.
    return reader.readAsDataURL(url);


  }

  upload(item: FileItem) {
    item['alias'] = 'attached';
    console.log(item);
    item.formData.append('type_file', 'image');
    item.upload({
        method: 'POST',
        url: `${this.rest.url}/rest/media`
      },
      {headers: this.rest.getHeadersMedia()});
  }

}
