import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../shared/services/util.service';


declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public location:any = null;
  constructor(util:UtilsService) {
    util.getLocation.subscribe(data => {
      this.location = data[0];
      console.log(this.location)
    });
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
