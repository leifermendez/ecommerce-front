import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxNewsComponent } from './box-news.component';

describe('BoxNewsComponent', () => {
  let component: BoxNewsComponent;
  let fixture: ComponentFixture<BoxNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
