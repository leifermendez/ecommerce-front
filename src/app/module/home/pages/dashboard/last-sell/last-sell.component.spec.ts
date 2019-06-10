import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSellComponent } from './last-sell.component';

describe('LastSellComponent', () => {
  let component: LastSellComponent;
  let fixture: ComponentFixture<LastSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
