import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {UtilsService} from '../../../../../shared/services/util.service';

declare var $: any;

@Component({
  selector: 'app-shop-cif',
  templateUrl: './shop-cif.component.html',
  styleUrls: ['./shop-cif.component.css']
})
export class ShopCifComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public editform: any = {};

  public form: any = FormGroup;
  loading: boolean;
  id: any;
  public validateFlag: any = false;

  constructor(private rest: RestService,
              private fb: FormBuilder,
              public util: UtilsService,
              private bsModalRef: BsModalRef) {
    this.form = fb.group({
      'cif': [null, Validators.compose([Validators.required])]
    });
  }

  clickElementHidden = () => $(`html body .slide-hidden`).toggleClass('open');

  validate = () => {
    this.loading = true;
    this.rest.get(`/rest/check-cif/${this.editform['cif']}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          if (response['data']) {
            this.validateFlag = true;
            this.callback.emit(this.editform['cif']);
            this.clickElementHidden();
          }
        }
      }).catch(err => {
      this.util.openSnackBar('CIF no valido', 'error');
    });

  };

  ngOnInit() {
  }

}
