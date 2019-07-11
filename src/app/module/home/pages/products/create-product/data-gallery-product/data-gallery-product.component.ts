import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../../../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {ZipLocationComponent} from '../../../../components/zip-location/zip-location.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalImageComponent} from '../modal-image/modal-image.component';

@Component({
  selector: 'app-data-gallery-product',
  templateUrl: './data-gallery-product.component.html',
  styleUrls: ['./data-gallery-product.component.css']
})
export class DataGalleryProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  @Input() data: any = {gallery: []};
  public loading = false;
  public filesReady: any = [];
  public responseData: any = [];
  public loading_save = false;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: false,
    keyboard: true
  };

  constructor(private httpClient: HttpClient, private rest: RestService,
              private router: Router, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  emitBack = () => this.ngOnInit();

  setPreview = (data) => {
    if (this.data) {
      this.data['gallery'].find(a => {
        if (a.id === data['id']) {
          a = data;
          return a;
        }
      });

    }
  };

  open(data) {
    const initialState = {
      ignoreBackdropClick: false,
      emitBack: this.emitBack,
      data
    };

    this.modalRef = this.modalService.show(
      ModalImageComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  clear = () => {
    this.loading_save = true;
    this.rest.post(`/rest/clear-cache`, {})
      .then((response: any) => {
        this.loading_save = false;
      });
  };

  uploadSave = (variation_id = null) => {

    if (this.filesReady.length) {
      this.loading = true;
      this.loading_save = true;
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
              this.loading_save = true;
              // this.responseData.push(res['data']['id']);
              this.updateItem(res['data']['id'], variation_id);
            },
            (err) => {
              this.loading = false;
              this.loading_save = true;
            }
          );
      });
    }

  };

  updateItem = (id, variation = null) => {
    this.loading_save = true;
    const _data = {
      'attached_id': id,
      'variation_product_id': variation,
      'product_id': this.id
    };

    this.rest.post(`/rest/product-media`, _data)
      .then((response: any) => {
        this.loading_save = false;
        this.router.navigateByUrl(`/products/edit/${this.id}/variations`);
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
