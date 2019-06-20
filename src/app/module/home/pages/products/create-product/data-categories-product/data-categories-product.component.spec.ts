import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCategoriesProductComponent } from './data-categories-product.component';

describe('DataCategoriesProductComponent', () => {
  let component: DataCategoriesProductComponent;
  let fixture: ComponentFixture<DataCategoriesProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCategoriesProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCategoriesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
