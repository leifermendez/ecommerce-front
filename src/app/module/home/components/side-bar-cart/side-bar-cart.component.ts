import {Component, Input, OnInit} from '@angular/core';
import { UtilsService } from '../../../../shared/services/util.service';


@Component({
  selector: 'app-side-bar-cart',
  templateUrl: './side-bar-cart.component.html',
  styleUrls: ['./side-bar-cart.component.css']
})
export class SideBarCartComponent implements OnInit {
  @Input() step: any = 1;
  public total: any;

  constructor(private util: UtilsService) {
    this.util.refreshShoppingData.subscribe(data => {
      if (data) {
        this.total = data['total_shop']
      }
    });
  }

  ngOnInit() {
  }



}
