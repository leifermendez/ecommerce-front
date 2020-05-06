import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe'
})
export class PricePipePipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    let v = value;
    const _i = Number.parseFloat(value).toFixed(2)
    const inte = (_i+"").split(".");
    return `<div class="price-pipe"><span class="_price">${inte[0]}</span><span class="_cents">${(inte[1]) ? inte[1] : 0} ${(args) ? args : ''}</span></div>`;
  }

}
