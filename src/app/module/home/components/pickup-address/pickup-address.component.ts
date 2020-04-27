import {Component, OnInit, Input} from '@angular/core';
import {UtilsService} from '../../../../shared/services/util.service';
import {RestService} from '../../../../shared/services/rest.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pickup-address',
  templateUrl: './pickup-address.component.html',
  styleUrls: ['./pickup-address.component.css']
})
export class PickupAddressComponent implements OnInit {
  @Input() id: any = null;
  public address_id: any = null;
  public loading: any = false;
  public form: any = FormGroup;
  public data: any = [];
  public address_gp: any = null;
;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: environment.country}
  };
  public editform: any = {};

  constructor(private rest: RestService, private util: UtilsService,
              private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      'shop_id': [null, Validators.compose([Validators.required])],
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'instructions': ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = routeParams['id'];
      this.loadData(this.id);
    });

  }

  loadData = (id) => {
    this.loading = true;
    this.rest.get(`/rest/pickup-address`,
      {
        shop_id: id
      })
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
        }
      }).catch((err) => {
      this.loading = false;
    });
  };

  public handleAddressChange(address: Address) {
    this.editform.address = address['formatted_address'];
    this.editform['lat'] = address.geometry.location.lat();
    this.editform['lng'] = address.geometry.location.lng();
    console.log(address);
    this.getCountry(address['address_components'])
      .then((a) => this.editform['country'] = a);

    this.getLocality(address['address_components'])
      .then((a) => this.editform['state'] = a);

    this.getZipCode(address['address_components'])
      .then(zip_code => {
        this.editform['zip_code'] = zip_code;
      }).catch(error => {
      return false;
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

  getCountry = (data) => new Promise((resolve, reject) => {
    if (data && (typeof data) === 'object') {
      const res = data.find(b => b.types[0] === 'country');
      if (res) {
        resolve(res['short_name']);
      } else {
        reject(new Error('Not valid address object'));
      }
    } else {
      reject(new Error('Not valid address object'));
    }
  });

  getLocality = (data) => new Promise((resolve, reject) => {
    if (data && (typeof data) === 'object') {
      const res = data.find(b => b.types[0] === 'locality');
      if (res) {
        resolve(res['short_name']);
      } else {
        reject(new Error('Not valid address object'));
      }
    } else {
      reject(new Error('Not valid address object'));
    }
  });

  clickEdit = (a) => {
    this.data = [];
    this.address_id = a['id'];
    this.editform = {...this.editform, ...a};
  };

  save = () => {
    if (event) {
      this.loading = true;
      this.editform['shop_id'] = this.id;
      const method = (this.address_id) ? 'put' : 'post';
      event.preventDefault();

      this.rest[method](`/rest/pickup-address${(this.address_id) ? `/${this.address_id}` : ''}`,
        this.editform)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.data.push(response['data']);
            this.util.openSnackBar('Direccion actualizada', 'success');
          }
        }).catch(err => {
        this.loading = false;
      });
    }
  };

  countryLower = (a) => {
    return a.toLowerCase();
  };

}
