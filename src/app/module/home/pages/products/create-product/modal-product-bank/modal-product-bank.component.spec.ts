import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductBankComponent } from './modal-product-bank.component';

describe('ModalProductBankComponent', () => {
  let component: ModalProductBankComponent;
  let fixture: ComponentFixture<ModalProductBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProductBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
