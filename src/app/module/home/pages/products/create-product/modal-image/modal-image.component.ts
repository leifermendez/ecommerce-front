import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileItem, HttpClientUploadService, InputFileOptions, MineTypeEnum} from '@wkoza/ngx-upload';
import {RestService} from '../../../../../../shared/services/rest.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  @Output() callback: EventEmitter<any> = new EventEmitter();
  public loading = false;
  public data: any = null;
  public preview = null;
  public loading_save = false;
  public optionsInput: InputFileOptions = {
    multiple: true,
    accept: [MineTypeEnum.Image]
  };

  constructor(public  uploader: HttpClientUploadService, private rest: RestService) {
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      return false;
    };
  }

  remove = () => {
    const list = this.uploader.queue;
    if (list.length) {
      console.log('-list', list);
      this.preview = false;
      list.map(a => a.remove());
    }
  };

  save = () => {
    const _file = this.uploader.queue[0];
    this.upload(_file);
  };

  upload(item: FileItem) {
   this.loading_save = true;
    item['alias'] = 'attached';
    console.log(item);
    item.formData.append('type_file', 'image');
    item.formData.append('id', this.data['id']);

    item.upload({
        method: 'POST',
        url: `${this.rest.url}/rest/media`
      },
      {headers: this.rest.getHeadersMedia()});
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
        _file.remove();
        this.loading_save = false;
        this.callback.emit(data['body']);
        console.log(`upload file successful:  ${data.item} ${data.body} ${data.status} ${data.headers}`);
      }
    );


    this.uploader.onAddToQueue$.subscribe(
      () => {
        const _file = this.uploader.queue[0];
        console.log('here');
        if (_file) {
          this.preview = _file;
          // this.upload(_file);
        }
      }
    );
  }

}
