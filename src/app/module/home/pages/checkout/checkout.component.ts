import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {WelcomeComponent} from '../../components/welcome/welcome.component';
import {ModalShippingComponent} from '../profile/modal-shipping/modal-shipping.component';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  data: any = [];
  public loading = false;
  public zip_code = null;
  addres: any;
  addreselect: any = null;
  public form: any = FormGroup;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };
  public address: any;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: 'ES'}
  };
  public editform: any = {};

  private msg: string;

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private modalService: BsModalService, private fb: FormBuilder,
              private router: Router) {
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
    console.log(address);
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


  emitBack = () => this.ngOnInit();

  ngOnInit() {
    this.loadData();
  }

  saveData = () => {
    this.loading = true;
    this.rest.post(`/rest/shipping`,
      this.editform)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];
        }
      });
  };

  loadData() {
    this.loading = true;
    this.rest.get(`/rest/shipping`).then((response: any) => {
      this.loading = false;
      this.data = response.data;
      this.editform = (this.data.data && this.data.data.length) ?
        this.data.data[0] : {};
    }).catch((error: any) => {
      console.log(error);
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
      Object.assign({initialState}, {
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
