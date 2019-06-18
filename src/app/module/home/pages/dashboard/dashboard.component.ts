import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthshopService} from '../../../auth/authshop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  public data: any = null;
  public type: any = null;

  constructor(private auth: AuthshopService) {
  }

  switch = (type) => {
    this.type = type;
    this.data['menu_rol'] = type;
    this.auth.updateUser('menu_rol', type);
    this.callback.emit({type});
  };

  ngOnInit() {
    this.data = this.auth.getCurrentUser();
    console.log('----->', this.data);
  }

}
