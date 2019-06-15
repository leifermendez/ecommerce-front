import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalComponent } from './dashboard-total.component';

describe('DashboardTotalComponent', () => {
  let component: DashboardTotalComponent;
  let fixture: ComponentFixture<DashboardTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
