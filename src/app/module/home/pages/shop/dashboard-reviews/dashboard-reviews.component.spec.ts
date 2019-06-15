import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReviewsComponent } from './dashboard-reviews.component';

describe('DashboardReviewsComponent', () => {
  let component: DashboardReviewsComponent;
  let fixture: ComponentFixture<DashboardReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
