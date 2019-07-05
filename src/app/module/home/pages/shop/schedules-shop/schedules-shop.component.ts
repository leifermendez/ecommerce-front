import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schedules-shop',
  templateUrl: './schedules-shop.component.html',
  styleUrls: ['./schedules-shop.component.css']
})
export class SchedulesShopComponent implements OnInit {
  @Input() data_inside: any = {};
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public rangeDate: any;
  public loading = false;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService,
              private router: Router) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'legal_id': [null, Validators.compose([Validators.required])],
      'email_corporate': [null, Validators.compose([Validators.required])],
      'phone_mobil': [null, Validators.compose([Validators.required])],
      'phone_fixed': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'zip_code': [null, Validators.compose([Validators.required])],
      'meta_key': [null, Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
  }

}
