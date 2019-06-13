import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../shared/services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  public editform: any = {

  };
  
  public form: any = FormGroup;
  loading: boolean;
  id: any;

  constructor(private rest: RestService,
    private fb: FormBuilder,
    private bsModalRef: BsModalRef) {
    this.form = fb.group({
      'cif': [null, Validators.compose([Validators.required])]
    });
  }

  validate = () => {
    this.loading = true;
    this.rest.get(`/rest/payment-user`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.editform = response['data'];
        }
      });
  };

  ngOnInit() {
  }

}
