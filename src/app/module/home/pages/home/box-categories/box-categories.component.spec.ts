import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCategoriesComponent } from './box-categories.component';

describe('BoxCategoriesComponent', () => {
  let component: BoxCategoriesComponent;
  let fixture: ComponentFixture<BoxCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
