import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductSaleComponent } from './detail-product-sale.component';

describe('DetailProductSaleComponent', () => {
  let component: DetailProductSaleComponent;
  let fixture: ComponentFixture<DetailProductSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
