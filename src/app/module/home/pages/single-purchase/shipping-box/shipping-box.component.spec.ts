import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingBoxComponent } from './shipping-box.component';

describe('ShippingBoxComponent', () => {
  let component: ShippingBoxComponent;
  let fixture: ComponentFixture<ShippingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
