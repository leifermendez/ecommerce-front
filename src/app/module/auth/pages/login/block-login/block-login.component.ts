import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../../../shared/models/base.model';
import { AuthshopService } from '../../../authshop.service';
import { RestService } from '../../../../../shared/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../../shared/services/util.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShoppingCartComponent } from '../../../../home/components/shopping-cart/shopping-cart.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-block-login',
  templateUrl: './block-login.component.html',
  styleUrls: ['./block-login.component.css'],
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
export class BlockLoginComponent implements OnInit {
  @Input() modalPadding: any = 'p-4';
  @Input() redirect: any = false;
  public form: any = FormGroup;
  public user: any;
  public ah_accommodations = [];
  private _currentUser: UserModel;
  public selectAccommodation: any = null;
  public steps = 1;
  submitted = false;
  loading = false;

  constructor(private auth: AuthshopService, private rest: RestService,
    private router: Router, private utils: UtilsService,
    private translate: TranslateService,
    private fb: FormBuilder, private authService: AuthService,
    private route: ActivatedRoute,
    private cart: ShoppingCartComponent
  ) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'name': '',
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  ngOnInit() {
    this.AH_getAccommodations();
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
              id: null
            })
          });

        }
      }).catch((err) => {
        this.loading = false;
      });
  }

  goBackStep = () => {
    this.steps = this.steps - 1;
  };

  onKeydown(event, step = 2) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    if (event.key === 'Enter' && !(this.f.email.errors)) {
      this.steps = step;
    }
  }

  get f() {
    return this.form.controls;
  }
  emitPreview = (a) => {

    console.log(a)
  };
  login() {

    if (event) {
      this.loading = true;
      event.preventDefault();

      this.auth.login(
        {
          'email': this.form.value['email'],
          'password': this.form.value['password'],
          'name': this.form.value['name'],
          'role': this.form.value['role'],
        }
      ).then(logged => {
        this.loading = false;
        this.utils.closeAllModals();
        this.cart.loadData();

        if (logged['confirmed'] === 1) {
          if (this.redirect) {
            this.router.navigateByUrl(`${this.redirect}`);
          }
        } else if (logged['confirmed'] === 0) {
          this.router.navigateByUrl('/profile');
        } else {
          this.utils.openSnackBar('Login Fail', 'try again');
        }
      }).catch((error) => {
        this.loading = false;
        if (error['status'] === 400) {
          this.steps = 4;
        } else {
          this.utils.openSnackBar('Login Fail', 'try again');
        }
      });
    }
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
      console.log(data);
      this.user = data;
      this.user.avatar = data.photoUrl;
      this.user.uid = data.id;
      this.user.token = data.authToken;
      this.user.provider = 'google';
      this.socialloginrest(this.user);
    }
    ).catch(error => {
      console.log(error);
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data: any) => {
      console.log(data);
      this.user = data;
      this.user.avatar = data.photoUrl;
      this.user.uid = data.id;
      this.user.token = data.authToken;
      this.user.provider = 'facebook';
      this.socialloginrest(this.user);
    }
    ).catch(error => {
      console.log(error);
    });
  }

  socialloginrest(data) {
    this.loading = true;
    this.utils.closeAllModals();
    this.cart.loadData();
    this.auth.login_social(data).then(logged => {
      this.loading = false;
      if (logged['confirmed'] === 1) {
        if (this.redirect) {
          this.router.navigateByUrl(`${this.redirect}`);
        }
      } else if (logged['confirmed'] === 0) {
        this.router.navigateByUrl('/profile');
      } else {
        this.utils.openSnackBar('Login Fail', 'try again');
      }
    }).catch((error) => {
      this.loading = false;
      if (error['status'] === 400) {
        this.steps = 3;
      } else {
        this.utils.openSnackBar('Login Fail', 'try again');
      }
    });
  }
}
