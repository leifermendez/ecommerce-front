import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-data-variations-product',
  templateUrl: './data-variations-product.component.html',
  styleUrls: ['./data-variations-product.component.css']
})
export class DataVariationsProductComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() id: any = null;
  public form: any = FormGroup;
  public loading = false;
  public data_product: any = [];
  public variations: any = false;
  public apiDropzone: any;
  public editform: any = {};
  public loading_save = false;
  public list_variations: any = {
    item: []
  };

  constructor(private rest: RestService, private fb: FormBuilder) {
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

  dropzoneApiCallback = (a) => this.apiDropzone = a;

  addMedia = (a) => {
    this.loading_save = false;
    this.editform['attached_id'] = a;
    this.save_variation();
  };

  reset = () => this.apiDropzone.dropzone.reset();

  loadData = () => {
    this.rest.get(`/rest/products/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.data_product = response['data'];
          this.list_variations = {
            ...this.list_variations,
            ...response['data']['variations']
          };
        }
      });
  };

  save = () => {
    this.loading_save = true;
    this.apiDropzone.uploadSave();
  };

  save_variation = () => {
    this.loading_save = true;
    this.editform = {...this.editform, ...{product_id: this.id}};
    this.rest.post(`/rest/products-variations`, this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading_save = false;
          this.variations = response['data'];
        }
      });

  };
}
