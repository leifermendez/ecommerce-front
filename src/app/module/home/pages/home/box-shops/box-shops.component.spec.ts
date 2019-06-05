import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShopsComponent } from './box-shops.component';

describe('BoxShopsComponent', () => {
  let component: BoxShopsComponent;
  let fixture: ComponentFixture<BoxShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
