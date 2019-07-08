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
    monday: [new Date(), new Date()],
    monday_tmp: [],
    tuesday: [new Date(), new Date()],
    tuesday_tmp: [],
    wednesday: [new Date(), new Date()],
    wednesday_tmp: [],
    thursday: [new Date(), new Date()],
    thursday_tmp: [],
    friday: [new Date(), new Date()],
    friday_tmp: [],
    saturday: [new Date(), new Date()],
    saturday_tmp: [],
    sunday: [new Date(), new Date()],
    sunday_tmp: []
  };

  public loading = false;

  constructor(private auth: AuthshopService, private fb: FormBuilder,
              private rest: RestService, public util: UtilsService,
              private router: Router) {
  }

  a = (a) => console.log('---aaa', a);

  ngOnInit() {
    if (this.id) {
      this.loadData();
    }
  }

  loadData = () => {
    this.rest.get(`/rest/schedules/${this.id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          const data = response['data'];
          const shedule_hours = data['shedule_hours'];
          this.days['monday_tmp'] = (shedule_hours['monday']) ? shedule_hours['monday'] : [];
          this.days['tuesday_tmp'] = (shedule_hours['tuesday']) ? shedule_hours['tuesday'] : [];
          this.days['wednesday_tmp'] = (shedule_hours['wednesday']) ? shedule_hours['wednesday'] : [];
          this.days['thursday_tmp'] = (shedule_hours['thursday']) ? shedule_hours['thursday'] : [];
          this.days['friday_tmp'] = (shedule_hours['friday']) ? shedule_hours['friday'] : [];
          this.days['saturday_tmp'] = (shedule_hours['saturday']) ? shedule_hours['saturday'] : [];
          this.days['sunday_tmp'] = (shedule_hours['sunday']) ? shedule_hours['sunday'] : [];
          this.format_schedule('monday', this.days['monday_tmp']);
          this.format_schedule('tuesday', this.days['monday_tmp']);
          this.format_schedule('wednesday', this.days['monday_tmp']);
          this.format_schedule('thursday', this.days['monday_tmp']);
          this.format_schedule('friday', this.days['monday_tmp']);
          this.format_schedule('saturday', this.days['monday_tmp']);
          this.format_schedule('sunday', this.days['monday_tmp']);
        }
      });
  };

  format_schedule = (day = null, obj: []) => {
    /*[
      "08:20-23:55",
      "08:20-23:55",
    ]*/
    console.log('------', this.days[day]);
    obj.map((a: any) => {
      let pop = a.split('-');
      const tmp_a = moment(pop[0], 'HH:mm').toString();
      const tmp_b = moment(pop[1], 'HH:mm').toString();
      this.days[day][0] = tmp_a;
      this.days[day][1] = tmp_b;
    });
  };

  saveData = () => {
    if (event) {
      event.preventDefault();
      console.log('anmtes--->', this.days);
      const shedule_hours = {
        'monday': [
          `${moment(this.days['monday'][0])
            .format('HH')}:${moment(this.days['monday'][0])
            .format('mm')}-${moment(this.days['monday'][1])
            .format('HH')}:${moment(this.days['monday'][1])
            .format('mm')}`
        ],
        'tuesday': [
          `${moment(this.days['tuesday'][0])
            .format('HH')}:${moment(this.days['tuesday'][0])
            .format('mm')}-${moment(this.days['tuesday'][1])
            .format('HH')}:${moment(this.days['tuesday'][1])
            .format('mm')}`
        ],
        'wednesday': [
          `${moment(this.days['wednesday'][0])
            .format('HH')}:${moment(this.days['wednesday'][0])
            .format('mm')}-${moment(this.days['wednesday'][1])
            .format('HH')}:${moment(this.days['wednesday'][1])
            .format('mm')}`
        ],
        'thursday': [
          `${moment(this.days['thursday'][0])
            .format('HH')}:${moment(this.days['thursday'][0])
            .format('mm')}-${moment(this.days['thursday'][1])
            .format('HH')}:${moment(this.days['thursday'][1])
            .format('mm')}`
        ],
        'friday': [
          `${moment(this.days['friday'][0])
            .format('HH')}:${moment(this.days['friday'][0])
            .format('mm')}-${moment(this.days['friday'][1])
            .format('HH')}:${moment(this.days['friday'][1])
            .format('mm')}`
        ],
        'saturday': [
          `${moment(this.days['saturday'][0])
            .format('HH')}:${moment(this.days['saturday'][0])
            .format('mm')}-${moment(this.days['saturday'][1])
            .format('HH')}:${moment(this.days['saturday'][1])
            .format('mm')}`
        ],
        'sunday': [
          `${moment(this.days['sunday'][0])
            .format('HH')}:${moment(this.days['sunday'][0])
            .format('mm')}-${moment(this.days['sunday'][1])
            .format('HH')}:${moment(this.days['sunday'][1])
            .format('mm')}`
        ]
      };
      console.log('sss-->', shedule_hours);
      const data = {
        shop_id: '5',
        shedule_hours
      };

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
