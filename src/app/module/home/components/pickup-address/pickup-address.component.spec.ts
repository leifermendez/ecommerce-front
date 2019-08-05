import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupAddressComponent } from './pickup-address.component';

describe('PickupAddressComponent', () => {
  let component: PickupAddressComponent;
  let fixture: ComponentFixture<PickupAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
