import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(()=> {
      this.footer = (this.router.url === '/login')
    } );
  }

}
