import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../../shared/models/base.model';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {AuthshopService} from '../../authshop.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: any = FormGroup;
  public user: any;
  private _currentUser: UserModel;
  public steps = 1;
  submitted = false;
  loading = false;

  constructor(private auth: AuthshopService, private rest: RestService,
              private router: Router, private utils: UtilsService,
              private fb: FormBuilder, private authService: AuthService,
              private route: ActivatedRoute
  ) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'name': '',
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  ngOnInit() {

  }

  get f() {
    return this.form.controls;
  }

  login() {

    if (event) {
      this.loading = true;
      event.preventDefault();

      this.auth.login(
        this.form.value['email'],
        this.form.value['password'],
        this.form.value['name']
      ).then(loged => {
        this.loading = false;
        console.log('-------------- ', loged);
        if (loged['confirmed'] === 1) {
          this.router.navigateByUrl('/home');
        } else if (loged['confirmed'] === 0) {
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
    this.rest.post('/social-login', data)
      .then((response: any) => {
        console.log(response);
        if (response.user) {
          this._currentUser = response.user;
          this.auth.emitlogin(this._currentUser);
          this.router.navigateByUrl('/home');
          localStorage.setItem('currentUser', JSON.stringify({
            email: response.user.email, token: response.token,
            datauser: response.user
          }));
          this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + response.token);
        }
      }).catch((e) => {
      console.log(e);
      if (e.error.errors.msg === 'USER_DOES_NOT_EXIST') {
      } else {
        this.utils.openSnackBar('Login Fail', 'error');
      }
    });
  }
}
