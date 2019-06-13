import { Component, OnInit } from '@angular/core';
import {AuthshopService} from '../../../../auth/authshop.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public data: any = null;
  constructor(private auth: AuthshopService) { }

  ngOnInit() {
  this.data = this.auth.getCurrentUser();
  }

}
