import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-product-sale',
  templateUrl: './detail-product-sale.component.html',
  styleUrls: ['./detail-product-sale.component.css']
})
export class DetailProductSaleComponent implements OnInit {
  @Input() data: any = {};
  loading: any = false;
  constructor() { }

  ngOnInit() {
  }

}
