import { Component, OnInit } from '@angular/core';
import { AuthshopService } from '../../authshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthshopService, private router: Router) { }

  ngOnInit() {
    this.auth.logout()
    this.router.navigateByUrl('/');
  }

}
