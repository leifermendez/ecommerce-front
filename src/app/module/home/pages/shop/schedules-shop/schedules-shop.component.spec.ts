import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesShopComponent } from './schedules-shop.component';

describe('SchedulesShopComponent', () => {
  let component: SchedulesShopComponent;
  let fixture: ComponentFixture<SchedulesShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
