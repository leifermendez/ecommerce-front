import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCategoriesComponent } from './side-categories.component';

describe('SideCategoriesComponent', () => {
  let component: SideCategoriesComponent;
  let fixture: ComponentFixture<SideCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
