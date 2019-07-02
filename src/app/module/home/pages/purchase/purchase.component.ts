import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ElementOptions, ElementsOptions, StripeCardComponent, StripeService} from 'ngx-stripe';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#dadada'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
  public from: any = 'user';
  public data: any = {data: []};
  public loading = false;
  public loading_save = false;
  public form: any = FormGroup;
  public editform: any = {};
  private uuid: any = null;
  stripeTest: FormGroup;

  constructor(private rest: RestService, private util: UtilsService, private shopping: ShoppingCartComponent,
              private route: ActivatedRoute, private modalService: BsModalService, private fb: FormBuilder,
              private stripeService: StripeService, private router: Router) {
  }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    console.log('lleueueue')
    this.stripeService
      .createToken(this.card.getCard(), {name})
      .subscribe(result => {
        if (result.token) {
          this.pay(result.token.id, this.uuid);
        } else if (result.error) {
          this.loading = false;
          this.util.openSnackBar('Error tarjeta', 'error');
        }
      });
  }

  pay = (source = null, purchase_uuid = null) => {
    this.loading = true;
    console.log('a->', source);
    console.log('b->', purchase_uuid);
    this.rest.post('/rest/payment', {
      source,
      purchase_uuid
    })
      .then((response: any) => {
        this.loading = false;
        this.router.navigateByUrl(`/thank-you/${response['data']['uuid']}`);
      }).catch((error: any) => {
      this.loading = false;
      this.util.openModalSnack(
        'Pago no procesado',
         'error',
         JSON.stringify(error)
        );
    });
  };

  purchase() {
    this.loading_save = true;
    this.rest.post('/rest/purchase', {})
      .then((response: any) => {
        this.loading_save = false;
        this.uuid = response['data'][0]['uuid'];
        this.buy();
      }).catch((error: any) => {
        console.log(error)
      this.loading_save = false;
      this.util.openModalSnack(
        'Pedido no procesado',
         'error',
         JSON.stringify(error)
        );
    });
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/purchase`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
        }
      });
  };
}
