import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShippingComponent } from './modal-shipping.component';

describe('ModalShippingComponent', () => {
  let component: ModalShippingComponent;
  let fixture: ComponentFixture<ModalShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
