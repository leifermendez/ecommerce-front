import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoShopsComponent } from './info-shops.component';

describe('InfoShopsComponent', () => {
  let component: InfoShopsComponent;
  let fixture: ComponentFixture<InfoShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
