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

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService,
              private router: Router) {
  }

  @Input() id: any = null;
  public user_data: any = null;
  public form: any = FormGroup;
  public data: any = {};
  public editform: any = {};
  public loading: any = false;
  private has_schedules = false;

  public days: any = {
    monday: [null, null],
    monday_tmp: [],
    monday_open: false,
    tuesday: [null, null],
    tuesday_tmp: [],
    tuesday_open: false,
    wednesday: [null, null],
    wednesday_tmp: [],
    wednesday_open: false,
    thursday: [null, null],
    thursday_tmp: [],
    thursday_open: false,
    friday: [null, null],
    friday_tmp: [],
    friday_open: false,
    saturday: [null, null],
    saturday_tmp: [],
    saturday_open: false,
    sunday: [null, null],
    sunday_tmp: [],
    sunday_open: false
  };


  ngOnInit() {
    if (this.id) {
      this.loadData();
    }
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/schedules/${this.id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          const data = response['data'];
          this.has_schedules = (response['data']);
          const shedule_hours = (data && data['shedule_hours']) ? data['shedule_hours'] : null;
          this.days['monday_tmp'] = (shedule_hours && shedule_hours['monday']) ? shedule_hours['monday'] : [];
          this.days['tuesday_tmp'] = (shedule_hours && shedule_hours['tuesday']) ? shedule_hours['tuesday'] : [];
          this.days['wednesday_tmp'] = (shedule_hours && shedule_hours['wednesday']) ? shedule_hours['wednesday'] : [];
          this.days['thursday_tmp'] = (shedule_hours && shedule_hours['thursday']) ? shedule_hours['thursday'] : [];
          this.days['friday_tmp'] = (shedule_hours && shedule_hours['friday']) ? shedule_hours['friday'] : [];
          this.days['saturday_tmp'] = (shedule_hours && shedule_hours['saturday']) ? shedule_hours['saturday'] : [];
          this.days['sunday_tmp'] = (shedule_hours && shedule_hours['sunday']) ? shedule_hours['sunday'] : [];
          this.format_schedule('monday', this.days['monday_tmp']);
          this.format_schedule('tuesday', this.days['tuesday_tmp']);
          this.format_schedule('wednesday', this.days['wednesday_tmp']);
          this.format_schedule('thursday', this.days['thursday_tmp']);
          this.format_schedule('friday', this.days['friday_tmp']);
          this.format_schedule('saturday', this.days['saturday_tmp']);
          this.format_schedule('sunday', this.days['sunday_tmp']);
        }
      });
  };

  format_schedule = (day = null, obj: []) => {
    let i = 0;
    obj.map((a: any) => {
      const pop = a.split('-');

      if (pop && pop.length) {
        const tmp_1 = (pop && pop[0]) ? moment(pop[0], 'HH:mm').toString() :
          null;
        const tmp_2 = (pop && pop[1]) ? moment(pop[1], 'HH:mm').toString() :
          null;
        if (i === 0) {
          this.days[`${day}_open`] = true;
          if (tmp_1) {
            this.days[day][0] = tmp_1;
          }
          if (tmp_2) {
            this.days[day][1] = tmp_2;
          }
        } else {
          if (tmp_1) {
            this.days[day][2] = tmp_1;
          }
          if (tmp_2) {
            this.days[day][3] = tmp_2;
          }
        }
      }

      i++;
    });
  };

  obj_schedule = (day, turn = 0) => {
    if (this.days[`${day}_open`]) {
      return `${moment(this.days[day][turn])
        .format('HH')}:${moment(this.days[day][turn])
        .format('mm')}-${moment(this.days[day][turn + 1])
        .format('HH')}:${moment(this.days[day][turn + 1])
        .format('mm')}`;
    } else {
      return false;
    }
  };

  validationDays = (a: any[], day = null) => {
    console.log('añañañña', a);
    a[day].push(this.obj_schedule('monday', 2));
    return a;
  };

  saveData = () => {
    if (event) {
      event.preventDefault();

      let shedule_hours = {
        'monday': (this.obj_schedule('monday')) ? [this.obj_schedule('monday')] : [],
        'tuesday': (this.obj_schedule('tuesday')) ? [this.obj_schedule('tuesday')] : [],
        'wednesday': (this.obj_schedule('wednesday')) ? [this.obj_schedule('wednesday')] : [],
        'thursday': (this.obj_schedule('thursday')) ? [this.obj_schedule('thursday')] : [],
        'friday': (this.obj_schedule('friday')) ? [this.obj_schedule('friday')] : [],
        'saturday': (this.obj_schedule('saturday')) ? [this.obj_schedule('saturday')] : [],
        'sunday': (this.obj_schedule('sunday')) ? [this.obj_schedule('sunday')] : [],
      };

      Object.keys(shedule_hours).map(a => {
        if (this.days[a].length > 2) {
          // @ts-ignore
          const res = this.validationDays(shedule_hours, a);
          shedule_hours = {...shedule_hours, ...res};
        }
      });

      const data = {
        shop_id: this.id,
        shedule_hours
      };

      this.loading = true;
      const _method = (this.has_schedules) ? 'put' : 'post';
      this.rest[_method](`/rest/schedules/${(this.has_schedules) ? this.has_schedules : ''}`, data)
        .then((response: any) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.util.openSnackBar('Horario actualizado', 'success');
          }
        });
    }
  };

}
