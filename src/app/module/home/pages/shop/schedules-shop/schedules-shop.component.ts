import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthshopService } from '../../../../auth/authshop.service';
import { RestService } from '../../../../../shared/services/rest.service';
import { UtilsService } from '../../../../../shared/services/util.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-schedules-shop',
  templateUrl: './schedules-shop.component.html',
  styleUrls: ['./schedules-shop.component.css']
})
export class SchedulesShopComponent implements OnInit {
  @Input() id: any = null;
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  private days_inside: any;
  mytime: Date = new Date();
  public dateTimeExample = null;
  public dateExample = null;
  public timeExample = null;

  public days: any = {
    monday: [new Date(),new Date()],
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

  a = (a) => console.log('---aaa',a)
  ngOnInit() {
    if(this.id){
      this.loadData()
    }
  }

  loadData = () => {
    this.rest.get(`/rest/schedules/${this.id}`)
    .then((response: any) => {
      this.loading = false;
      if (response['status'] === 'success') {
       

      }
    });
  }

  saveData = () => {
    if (event) {
      event.preventDefault();
      console.log('anmtes--->',this.days)
      const shedule_hours = {
        'friday':[
          `${moment(this.days['monday'][0])
          .format('HH')}:${moment(this.days['monday'][0])
          .format('mm')}-${moment(this.days['monday'][1])
          .format('HH')}:${moment(this.days['monday'][1])
          .format('mm')}`
        ]
      };
      console.log('sss-->',shedule_hours)
      const data = {
        shop_id:"5",
        shedule_hours
      }
 
      this.loading = true;
      const _method = (this.id) ? 'put' : 'post';
      this.rest[_method](`/rest/schedules/${(this.id) ? this.id : ''}`, data)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
           

          }
        });
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
