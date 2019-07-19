import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideFilterNavComponent } from './inside-filter-nav.component';

describe('InsideFilterNavComponent', () => {
  let component: InsideFilterNavComponent;
  let fixture: ComponentFixture<InsideFilterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideFilterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideFilterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
