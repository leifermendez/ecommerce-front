import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../shared/services/rest.service';
import { UtilsService } from '../../../../shared/services/util.service';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { ModalShippingComponent } from '../profile/modal-shipping/modal-shipping.component';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  data: any = [];
  public loading = false;
  public loading_save = false;
  public zip_code = null;
  public id_shipping_address:any = null;a
  addres: any;
  public staying: any = false;
  public ah_accommodations = [];
  public selectAccommodation: any = null;
  addreselect: any = null;
  public form: any = FormGroup;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };
  public address: any;
  public optionsPlaces = {
    types: [],
    componentRestrictions: { country: environment.country }
  };
  public editform: any = {};

  private msg: string;

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
    private route: ActivatedRoute, private modalService: BsModalService, private fb: FormBuilder,
    private router: Router, private translate: TranslateService, ) {
    this.form = fb.group({
      'country': [null, Validators.compose([Validators.required])],
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'zip_code': [null, Validators.compose([Validators.required])],
      'instructions': [null, Validators.compose([Validators.required])]
    });
  }

  public handleAddressChange(address: Address) {
    console.log(address)
    this.getZipCode(address['address_components'], 'postal_code')
      .then(zip_code => {
        this.zip_code = zip_code;
        this.checkZip(zip_code);
      }).catch(error => {
        this.address = '';
        this.msg = 'Not found';
      });

    this.getZipCode(address['address_components'], 'locality')
      .then(locality => {
        this.editform['state'] = locality;
      }).catch(error => {

      });
    this.getZipCode(address['address_components'], 'route')
      .then(locality => {
        this.editform['district'] = locality;
      }).catch(error => {

      });
  }

  public checkZip = (zip_code) => {
    this.loading_save = true;
    this.rest.get(`/rest/zone-available?src=${zip_code}`)
      .then((response: any) => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
          if (this.data && this.data.length) {
            this.editform['country'] = this.data[0]['country'];
            this.editform['zip_code'] = this.data[0]['zip_code'];
            console.log(this.editform)
          }
        }
      });
  };

  getZipCode = (data, type) => new Promise((resolve, reject) => {
    if (data && (typeof data) === 'object') {
      const res = data.find(b => b.types[0] === type);
      if (res) {
        resolve(res['short_name']);
      } else {
        reject(new Error('Not valid address object'));
      }
    } else {
      reject(new Error('Not valid address object'));
    }
  });

  emitPreview = (a) => {
    console.log(a)
    if (a && a.id) {
      this.editform = {
        country: a.localization['Country']['ISOCode'],
        district: a['city'],
        state: a['localization']['Locality']['Name'],
        address: a['name'],
        zip_code: a['localization']['District']['PostalCode'],
      }

      console.log('----', this.editform)
    } else {
      this.loadData();
    }
  };

  emitBack = () => this.ngOnInit();

  ngOnInit() {
    this.loadData();
  }

  AH_getAccommodations = () => {
    this.loading = true;
    this.rest.AH_get(`/web/process/accommodations`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.ah_accommodations = response['data'];
          this.translate.get('global.not_staying').subscribe((text: string) => {
            this.ah_accommodations.push({
              name: text,
              id: 'nope'
            })
          });

        }
      }).catch((err) => {
        this.loading = false;
      });
  }

  saveData = () => {
    const _method = (this.id_shipping_address) ? 'put' : 'post';
    this.loading_save = true;
    this.rest[_method](`/rest/shipping${(this.id_shipping_address) ? `/${this.id_shipping_address}` : ''}`,
      this.editform)
      .then((response: any) => {
        this.loading_save = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
          this.editform = { ...this.editform, ...response['data'] };
          this.router.navigateByUrl(`/payment`);
        }
      }).catch((error: any) => {
        this.loading_save = false;
        console.log('entro en el error')
        this.util.openSnackBar('Ups! algo ocurrio, llena todos los campos', 'error');
      });
  };

  loadData() {
    this.loading = true;
    this.rest.get(`/rest/shipping`).then((response: any) => {
      this.loading = false;
      this.data = response.data;
      this.editform = (this.data.data && this.data.data.length) ?
        this.data.data[0] : {};
      this.id_shipping_address = (this.data.data && this.data.data.length) ?
      this.data.data[0]['id'] : null;
      this.editform['country'] = environment.country;
      /*this.AH_getAccommodations();*/
    }).catch((error: any) => {
      this.loading = false;
      this.util.openSnackBar('Ups! algo ocurrio', 'error');
    });
  }

  openaddres(datElement = null) {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      // id: datElement
    };

    this.modalRef = this.modalService.show(
      ModalShippingComponent,
      Object.assign({ initialState }, {
        class: 'gray modal-lg top-modal box-shadow-modal'
      },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  selectOptions = (e) => {
    if (e && e['id']) {
      this.addres = e;
    }
  };

}
