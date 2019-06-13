import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public cif_flag: any = null;
  constructor() { }

  cif_callback = (e) => this.cif_flag = e

  ngOnInit() {
  }

}
