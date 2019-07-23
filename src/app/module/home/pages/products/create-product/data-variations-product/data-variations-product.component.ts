import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {RestService} from '../../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalShoppingComponent} from '../../../../components/modal-shopping/modal-shopping.component';
import {BsModalRef, BsModalService, TabsetComponent} from 'ngx-bootstrap';
import {ModalVariationsProductComponent} from '../modal-variations-product/modal-variations-product.component';
import {UtilsService} from '../../../../../../shared/services/util.service';

@Component({
  selector: 'app-data-variations-product',
  templateUrl: './data-variations-product.component.html',
  styleUrls: ['./data-variations-product.component.css']
})
export class DataVariationsProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  @ViewChild('panel') public panel: ElementRef;
  // @ts-ignore
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  modalRef: BsModalRef;
  config = {};
  public form: any = FormGroup;
  public loading = false;
  public data_product: any = {
    variations: []
  };
  public variations: any = false;
  public apiDropzone: any;
  public editform: any = {};
  public loading_save = false;
  public list_variations: any = {
    item: []
  };

  constructor(private rest: RestService, private fb: FormBuilder,
              private router: Router,
              private modalService: BsModalService,
              private utils: UtilsService) {
    this.form = fb.group({
      'label': [null, Validators.compose([Validators.required])],
      'price_normal': [null, Validators.compose([Validators.required])],
      'price_regular': [null, Validators.compose([Validators.required])],
      'observation': '',
      'weight': [null, Validators.compose([Validators.required])],
      'width': [null, Validators.compose([Validators.required])],
      'height': [null, Validators.compose([Validators.required])],
      'length': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.loadData();
    // this.loadDataList();
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].disabled = false;
    this.staticTabs.tabs[tabId].active = true;
    this.moveToSpecificView();
  }

  public moveToSpecificView(): void {


    setTimeout(() => {
      this.panel.nativeElement.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
    }, 250);
  }

  dropzoneApiCallback = (a) => this.apiDropzone = a;

  addMedia = (a) => {
    this.loading_save = false;
    this.editform['attached_id'] = a;
    this.save_variation();
  };

  emitBack = () => this.ngOnInit();

  setValue = (i, data) => {
    this.list_variations['item'][i] = {
      ...this.list_variations['item'][i],
      ...data
    };
  };

  open(data = null, i = null) {
    const initialState = {
      ignoreBackdropClick: false,
      emitBack: this.emitBack,
      setValue: this.setValue,
      index: i,
      product_id: this.id,
      data
    };

    this.modalRef = this.modalService.show(
      ModalVariationsProductComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  reset = () => this.apiDropzone.dropzone.reset();

  loadData = () => {
    this.rest.get(`/rest/products/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.data_product = response['data'];
          this.list_variations = this.data_product['variations'];
          if (this.list_variations.length) {
            this.utils.previewP.emit({variations: this.list_variations});
          } else {
            this.open();
          }
        }
      });
  };

  save = () => {
    this.loading_save = true;
    if (this.apiDropzone.checkFiles.length) {
      this.apiDropzone.uploadSave();
      this.apiDropzone.dropzone.reset();
    } else {
      this.save_variation();
    }
  };

  deleteProduct = (data, index) => {
    this.utils.openConfirm('¿Seguro?').then(r => {
      this.rest.put(`/rest/products-variations/${data['id']}`,
        {
          status: 'delete',
          product_id: data['product_id']
        })
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.utils.openSnackBar('Producto eliminado', 'success');
            this.list_variations['item'].splice(index, 1);
          }
        });
    }).catch(e => {
    });
  };

  save_variation = () => {
    this.loading_save = true;
    this.editform = {...this.editform, ...{product_id: this.id}};

    this.rest.post(`/rest/products-variations`, this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading_save = false;
          this.variations = response['data'];
          this.list_variations['item'].push(response['data']);
          this.editform = {};
          this.selectTab(0);
          // this.router.navigateByUrl(`/products`);
        }
      });

  };
}
