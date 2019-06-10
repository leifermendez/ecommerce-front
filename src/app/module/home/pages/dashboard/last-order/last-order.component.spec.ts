import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOrderComponent } from './last-order.component';

describe('LastOrderComponent', () => {
  let component: LastOrderComponent;
  let fixture: ComponentFixture<LastOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
