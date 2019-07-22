import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../../../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {ZipLocationComponent} from '../../../../components/zip-location/zip-location.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalImageComponent} from '../modal-image/modal-image.component';
import {UtilsService} from '../../../../../../shared/services/util.service';

@Component({
  selector: 'app-data-gallery-product',
  templateUrl: './data-gallery-product.component.html',
  styleUrls: ['./data-gallery-product.component.css']
})
export class DataGalleryProductComponent implements OnInit {
  @ViewChild('dropzone') dropzone: ElementRef;
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  @Input() data: any = {gallery: []};
  public loading = false;
  public filesReady: any = [];
  public responseData: any = [];
  public loading_save = false;
  public show_drag = false;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: false,
    keyboard: true
  };

  constructor(private httpClient: HttpClient, private rest: RestService,
              private router: Router, private modalService: BsModalService,
              private util: UtilsService) {
  }

  ngOnInit() {
  }

  emitBack = () => this.ngOnInit();

  setPreview = (data, i) => {
    if (this.data) {
      this.data['gallery'][i] = data;
    }
  };

  clearImages = () => {
    // @ts-ignore
    this.dropzone.reset();
    this.filesReady = [];
  };

  switchDrag = (a) => this.show_drag = a;

  confirmDelete = (id = null, index = null) => {
    this.util.openConfirm('¿Estas seguro?')
      .then(a => {
        this.rest.delete(`/rest/media/${id}`)
          .then((response: any) => {
            this.loading_save = false;
            this.data['gallery'].splice(index, 1);
          });
      })
      .catch(e => {
        console.log('ERRO');
      });
  };

  open(data, i) {
    console.log('index', i);
    const initialState = {
      ignoreBackdropClick: false,
      emitBack: this.emitBack,
      setPreview: this.setPreview,
      index: i,
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

  continueVariations = () =>  this.router.navigateByUrl(`/products/edit/${this.id}/variations`);

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
              this.data['gallery'].push(res['data']);
              this.updateItem(res['data']['id'], variation_id, res['data']);
            },
            (err) => {
              this.loading = false;
              this.loading_save = true;
            }
          );
      });
    }

  };

  updateItem = (id, variation = null, obj:null) => {
    this.loading_save = true;
    const _data = {
      'attached_id': id,
      'variation_product_id': variation,
      'product_id': this.id
    };

    this.util.previewP.emit({cover_image:obj});
    this.rest.post(`/rest/product-media`, _data)
      .then((response: any) => {
        this.loading_save = false;
        this.show_drag = false;
        // this.router.navigateByUrl(`/products/edit/${this.id}/variations`);
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
