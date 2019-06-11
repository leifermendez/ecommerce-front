import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBankComponent } from './info-bank.component';

describe('InfoBankComponent', () => {
  let component: InfoBankComponent;
  let fixture: ComponentFixture<InfoBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
