import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../../shared/models/base.model';
import { RestService } from '../../../../shared/services/rest.service';
import { UtilsService } from '../../../../shared/services/util.service';
import { AuthshopService } from '../../authshop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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

}
