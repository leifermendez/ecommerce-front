import {Component, OnInit, Input, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {Router} from '@angular/router';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrls: ['./info-shop.component.css']
})
export class InfoShopComponent implements OnInit, AfterViewInit {
  @Input() data_inside: any = {};
  @Input() id: any = null;
  @Output() callback = new EventEmitter<any>();
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public loading = false;
  public address_gp: any = null;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: 'ES'}
  };

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService,
              private router: Router) {

    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'legal_id': [null, Validators.compose([Validators.required])],
      'email_corporate': [null, Validators.compose([Validators.required])],
      'phone_mobil': [null, Validators.compose([Validators.required])],
      'phone_fixed': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'zip_code': [null, Validators.compose([Validators.required])],
      'meta_key': [null, Validators.compose([Validators.required])],

    });
  }

  get f() {
    return this.form.controls;
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
    this.editform.address = address['formatted_address'];
    this.editform['lat'] = address.geometry.location.lat();
    this.editform['lng'] = address.geometry.location.lng();

    this.getZipCode(address['address_components'])
      .then(zip_code => {
        this.editform['zip_code'] = zip_code;
      }).catch(error => {
      return false;
    });
  }

  setMedia = (type = null, data = null) => {
    if (type === 'cover') {
      this.editform['image_cover'] = data['id'];
      this.editform['image_cover_medium'] = data['medium'];
    } else {
      this.editform['image_header'] = data['id'];
      this.editform['image_header_medium'] = data['medium'];
    }
  };

  clearImage = (type = null) => {
    if (type === 'cover') {
      this.editform['image_cover'] = null;
    } else {
      this.editform['image_header'] = null;
    }
  };

  ngOnInit() {
    if (!this.id) {
      this.editform = {...this.editform, ...this.data_inside};
    } else {
      this.loadData(this.id);
    }

  }

  ngAfterViewInit = () => {

  };

  loadData = (id) => {
    this.loading = true;
    this.user_data = this.auth.getCurrentUser();
    this.rest.get(`/rest/shop/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.editform['email'] = this.user_data['email'];
          this.editform = {...response['data']};
          console.log(this.editform);
        }
      });
  };


  save = () => {
    if (event) {
      this.loading = true;
      const method = (this.id) ? 'put' : 'post';
      event.preventDefault();
      delete this.editform['image_cover_small'];
      delete this.editform['image_header_small'];
      delete this.editform['image_cover_medium'];
      delete this.editform['image_header_medium'];
      delete this.editform['image_cover_large'];
      delete this.editform['image_header_large'];

      this.rest[method](`/rest/shop/${(this.id) ? this.id : ''}`,
        this.editform)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.auth.updateUser('role', 'shop');
            this.router.navigateByUrl('/shop');
          }
        }).catch(err => {
        this.loading = false;
      });
    }
  };

}
