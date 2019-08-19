import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe'
})
export class PricePipePipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    let v = value;
    const _a = (v % 1).toString();
    const _d = Number.parseFloat(_a).toFixed(2)
    const decPart = (_d+"").split(".")[1];
    return `<div class="price-pipe"><span class="_price">${Number.parseFloat(v).toFixed(0)}</span><span class="_cents">${(decPart) ? decPart : 0} ${(args) ? args : ''}</span></div>`;
  }

}
