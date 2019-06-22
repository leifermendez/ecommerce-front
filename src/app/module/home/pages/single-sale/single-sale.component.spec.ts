import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSaleComponent } from './single-sale.component';

describe('SingleSaleComponent', () => {
  let component: SingleSaleComponent;
  let fixture: ComponentFixture<SingleSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
