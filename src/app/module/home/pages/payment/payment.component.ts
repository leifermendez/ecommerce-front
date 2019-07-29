import {Component, OnInit, ViewChild} from '@angular/core';
import {ElementOptions, ElementsOptions, StripeCardComponent, StripeService} from 'ngx-stripe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
      ])
    ])
  ]
})

export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  public computer: any = false;
  public mobile: any = false;
  public tablet: any = false;
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
              private stripeService: StripeService, private router: Router,
              private deviceService: DeviceDetectorService) {
                this.computer = this.deviceService.isDesktop();
                this.mobile = this.deviceService.isMobile();
                this.tablet = this.deviceService.isTablet();
  }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), {name})
      .subscribe(result => {
        console.log('herere',result)
        if (result.token) {
          this.pay(result.token.id, this.uuid);
          this.loading_save = false;
        } else if (result.error) {
          this.loading = false;
          this.loading_save = false;
          this.util.openSnackBar('Error tarjeta', 'error');
        }
      });
  }

  pay = (source = null, purchase_uuid = null) => {
    this.loading = true;
    this.loading_save = true;
    this.rest.post('/rest/payment', {
      source,
      purchase_uuid
    })
      .then((response: any) => {
        this.loading = false;
        this.loading_save = false;
        this.router.navigateByUrl(`/thank-you/${response['data']['uuid']}`);
      }).catch((error: any) => {
      this.loading = false;
      this.loading_save = false;
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
        this.uuid = response['data'][0]['uuid'];
        this.buy();
      }).catch((error: any) => {
      console.log(error);
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

