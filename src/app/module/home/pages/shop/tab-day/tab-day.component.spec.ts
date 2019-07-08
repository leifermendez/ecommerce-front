import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDayComponent } from './tab-day.component';

describe('TabDayComponent', () => {
  let component: TabDayComponent;
  let fixture: ComponentFixture<TabDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
