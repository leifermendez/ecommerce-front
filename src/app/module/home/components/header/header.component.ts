import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../shared/services/util.service';
import { ActivatedRoute, Router } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public location:any = null;
  header = false;
  constructor(util:UtilsService, private route: ActivatedRoute, private router: Router) {
    util.getLocation.subscribe(data => {
      this.location = data[0];
    });

    this.router.events.subscribe(()=> {
      this.header = (this.router.url === '/login')
    } );
   }
   
  scrollTop = (aid) => {
    const aTag = $(`#${aid}`);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    
  }

  searchFocus = () => {
    console.log('here')
  }

  ngOnInit() {
  }

}
