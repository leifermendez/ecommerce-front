import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {CookieService} from 'ngx-cookie-service';
import {RestService} from '../../../../shared/services/rest.service';
import {BsModalRef} from 'ngx-bootstrap';
import {UtilsService} from '../../../../shared/services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-zip-location',
  templateUrl: './zip-location.component.html',
  styleUrls: ['./zip-location.component.css']
})
export class ZipLocationComponent implements OnInit {
  public zip_code = null;
  public data: any[];
  public address: any;
  public msg: any;
  public buttonAvailable = false;
  loading = false;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: 'ES'}
  };

  nowCookies = moment().add(15, 'days').toDate();
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;


  constructor(private rest: RestService, private util: UtilsService, public bsModalRef: BsModalRef,
              private cookieService: CookieService) {

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
          if (this.data.length) {
            this.buttonAvailable = true;
            const _cookie_data = (this.data[0] && JSON.stringify(this.data[0])) ?
              JSON.stringify(this.data[0]) : null;
            this.cookieService.set(
              '_location_zip_code',
              _cookie_data,
              this.nowCookies,
              '/');
            this.util.getLocation.emit(this.data);
            this.bsModalRef.hide();
          } else {
            this.address = '';
            this.msg = 'Not available';
          }
        }
      });
  };


  ngOnInit() {

  }

}
