import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-modal-shipping',
  templateUrl: './modal-shipping.component.html',
  styleUrls: ['./modal-shipping.component.css']
})
export class ModalShippingComponent implements OnInit {

  public loading = false;
  public zip_code = null;
  public data: any = null;
  public form: any = FormGroup;
  public emitBack: any;
  public id: any = null;
  public buttonAvailable = false;
  public address: any;
  public address_single: any;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: 'ES'}
  };
  public deleteMe: any = false;
  public editform: any = {
  };

  private msg: string;


  constructor(private rest: RestService,
              private fb: FormBuilder,
              public bsModalRef: BsModalRef) {
    this.form = fb.group({
      'country': [null, Validators.compose([Validators.required])],
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'zip_code': [null, Validators.compose([Validators.required])],
      'instructions': [null, Validators.compose([Validators.required])]
    });
  }

  getZipCode = (data) => new Promise((resolve, reject) => {
    if (data && (typeof data) === 'object') {
      const res = data.find(b => b.types[0] === 'postal_code');
      if (res) {
        resolve(res['short_name']);
      } else {
        reject(new Error('Not valid address object'));
      }
    } else {
      reject(new Error('Not valid address object'));
    }
  });

  public handleAddressChange(address: Address) {
    console.log(address)
    this.address_single = address['formatted_address']
    this.getZipCode(address['address_components'])
      .then(zip_code => {
        this.zip_code = zip_code;
        this.checkZip(zip_code);
      }).catch(error => {
      this.address = '';
      this.msg = 'Not found';
    });
  }

  public checkZip = (zip_code) => {
    this.loading = true;
    this.rest.get(`/rest/zone-available?src=${zip_code}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
          if (this.data && this.data.length) {
            this.editform['country'] = this.data[0]['country'];
            this.editform['zip_code'] = this.data[0]['zip_code'];
          }
        }
      });
  };

  saveData = () => {
    this.loading = true;
    const method = (this.id) ? 'put' : 'post';
    this.editform['address'] = this.address_single + this.editform['address'];
    this.rest[method](`/rest/shipping/${(this.id) ? this.id : ''}`,
      this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];
          this.emitBack();
          this.bsModalRef.hide();
        }
      });
  };

  ngOnInit() {
    if (this.id) {
      this.getDetail();
    }
  }

  deleteBank = () => {
    this.loading = true;
    this.rest.delete(`/rest/shipping/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.emitBack();
          this.bsModalRef.hide();
        }
      });
  };

  getDetail = () => {
    this.loading = true;
    this.rest.get(`/rest/shipping/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.editform = response['data'];
        }
      });
  };

}
