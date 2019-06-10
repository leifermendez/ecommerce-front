import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTicketsComponent } from './last-tickets.component';

describe('LastTicketsComponent', () => {
  let component: LastTicketsComponent;
  let fixture: ComponentFixture<LastTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
