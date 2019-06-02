import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../../shared/models/base.model';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {AuthshopService} from '../../authshop.service';
import {Router} from '@angular/router';
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

  constructor(private auth: AuthshopService, private rest: RestService, private router: Router, private utils: UtilsService,
              private fb: FormBuilder, private authService: AuthService
  ) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  ngOnInit() {
  }
  login(event?) {
    if (event) {
      event.preventDefault();
      this.auth.login(this.form.value['email'], this.form.value['password']).then(loged => {
        if (loged) {
          console.log('aqui estas parado');
          this.router.navigateByUrl('/home');
        } else {
          this.utils.openSnackBar('Login Fail', 'try again');
        }
      }).catch((error) => {
        if (error) {
          this.utils.openSnackBar('Login Fail' , 'try again');
        }
      });
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (data: any) => {
        console.log(data);
        this.user = data;
        this.user.avatar = data.photoUrl;
        this.user.uid = data.id;
        this.user.token = data.authToken;
        this.user.provider = 'google';
        this.socialloginrest(this.user);
      }
    ).catch( error => {
      console.log(error);
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( (data: any) => {
        console.log(data);
        this.user = data;
        this.user.avatar = data.photoUrl;
        this.user.uid = data.id;
        this.user.token = data.authToken;
        this.user.provider = 'facebook';
        this.socialloginrest(this.user);
      }
    ).catch( error => {
      console.log(error);
    });
  }

  socialloginrest (data) {
    this.rest.post('/social-login', data)
      .then((response: any) => {
        console.log(response);
        if (response.user) {
          this._currentUser = response.user;
          this.auth.emitlogin(this._currentUser);
          this.router.navigateByUrl('/home');
          localStorage.setItem('currentUser', JSON.stringify({email: response.user.email, token: response.token,
            datauser: response.user }));
          this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + response.token);
        }
      }).catch((e) => {
      console.log(e);
      if (e.error.errors.msg === 'USER_DOES_NOT_EXIST') {
      } else {
        this.utils.openSnackBar('Login Fail' , 'error');
      }
    });
  }



}
