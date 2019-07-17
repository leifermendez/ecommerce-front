import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressShoppingCartComponent } from './address-shopping-cart.component';

describe('AddressShoppingCartComponent', () => {
  let component: AddressShoppingCartComponent;
  let fixture: ComponentFixture<AddressShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
