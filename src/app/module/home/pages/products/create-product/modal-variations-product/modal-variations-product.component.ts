import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../../shared/services/rest.service';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-variations-product',
  templateUrl: './modal-variations-product.component.html',
  styleUrls: ['./modal-variations-product.component.css']
})
export class ModalVariationsProductComponent implements OnInit {
  public editform: any = {};
  public form: any = FormGroup;
  public data: any = {};
  public setValue: any;
  public index: any = null;
  public loading_save = false;
  public apiDropzone: any;

  constructor(private fb: FormBuilder, private rest: RestService, public bsModalRef: BsModalRef) {
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
    this.editform = {...this.editform, ...this.data};
  }

  save = () => {
    this.loading_save = true;
    this.apiDropzone.uploadSave();
  };

  save_variation = () => {

    delete this.editform['attacheds_large'];
    delete this.editform['attacheds_medium'];
    delete this.editform['attacheds_small'];
    delete this.editform['gallery'];

    console.log('->', this.editform);
    this.loading_save = true;
    const _method = (this.editform['id']) ? 'put' : 'post';
    this.rest[_method](`/rest/products-variations/${(this.editform['id']) ? this.editform['id'] : ''}`, this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading_save = false;
          this.setValue(this.index, response['data']);
          this.bsModalRef.hide();
          // this.variations = response['data'];
          // this.router.navigateByUrl(`/products`);
        }
      });

  };
}
