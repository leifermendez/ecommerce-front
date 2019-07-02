import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-discount-number',
  template: `
    {{total}}
  `,
  styles: []
})
export class DiscountNumberComponent implements OnInit, OnChanges {
  @Input() price_normal: any = 0;
  @Input() price_regular: any = 0;
  @Input() decimals: any = 2;
  public total = '';

  constructor() {
  }
  ngOnChanges(changes) {
    console.log(changes);
    this.init();
  }
  ngOnInit() {

  }

  init = () => {
    console.log(this.price_normal);
    let total = parseFloat(String(this.price_normal * 100));
    total = parseFloat(String(total / this.price_regular));
    this.total = parseFloat(String(100 - total)).toFixed(this.decimals);
  };

}
