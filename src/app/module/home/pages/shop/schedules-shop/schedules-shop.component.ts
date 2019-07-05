import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthshopService} from '../../../../auth/authshop.service';
import {RestService} from '../../../../../shared/services/rest.service';
import {UtilsService} from '../../../../../shared/services/util.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

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
  private days_inside: any;

  public dateTimeExample = null;
  public dateExample = null;
  public timeExample = null;

  public days: any = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };
  public loading = false;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService,
              private router: Router) {
  }

  ngOnInit() {

  }

  saveData = () => {
    if (event) {
      this.days_inside = this.days;
      const shedule_hours = {
        'monday': this.data_inside['monday'], //['09:00-12:00', '13:00-18:00']
      };

      console.log('---->', this.days);
      console.log('---->', shedule_hours);
      // this.loading = true;
      // event.preventDefault();
      // this.rest.post(`/rest/schedules`, this.editform)
      //   .then((response: any) => {
      //     this.loading = false;
      //     if (response['status'] === 'success') {
      //       this.ngOnInit();
      //
      //     }
      //   });
    }
  };

  format_hours = async (a: []) => {
    a.forEach(function (element: string) {
      element.replace(/am/i, '');
      element.replace(/pm/i, '');
    });
    a.join('-');
    return a;
  };

  add_schedule = (day = null) => {
    this.dateExample = new Date();
    const start = `${'8'}:${'00'} ${(8 > 11 ? 'am' : 'pm')}`;
    const finish = `${'20'}:${'00'} ${(20 > 11 ? 'am' : 'pm')}`;
    this.days[day][0] = start;
    this.days[day][1] = finish;
  };

}
