import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBankComponent } from './modal-bank.component';

describe('ModalBankComponent', () => {
  let component: ModalBankComponent;
  let fixture: ComponentFixture<ModalBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
