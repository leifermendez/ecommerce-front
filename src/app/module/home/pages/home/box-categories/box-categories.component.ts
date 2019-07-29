import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RestService} from '../../../../../shared/services/rest.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { UtilsService } from '../../../../../shared/services/util.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-box-categories',
  templateUrl: './box-categories.component.html',
  styleUrls: ['./box-categories.component.css'],
  animations: [
    trigger('tijl', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class BoxCategoriesComponent implements OnInit {


  @ViewChild('owlCategories') owlElement: OwlCarousel;
  @Input() items: any = 4;
  public data: any;
  public optionsOws: any;
  public loading = false;
  public computer: any = false;
  public mobile: any = false;
  public tablet: any = false;

  constructor(private rest: RestService,
    private deviceService: DeviceDetectorService,
    private util: UtilsService,) {
      this.computer = this.deviceService.isDesktop();
      this.mobile = this.deviceService.isMobile();
      this.tablet = this.deviceService.isTablet();
  }

  ngOnInit() {
    this.optionsOws = {
      dots: false,
      navigation: true,
      autoplay: false,
      items: this.items,
      margin: 5,
      autoWidth: true,
    };
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.loading = true;
    this.rest.get(`/rest/categories${(!this.computer) ? '?group=all' : ''}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          this.data = response['data'];
          console.log(this.data);
        }
      });
  }

}
