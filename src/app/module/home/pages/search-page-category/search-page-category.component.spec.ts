import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageCategoryComponent } from './search-page-category.component';

describe('SearchPageCategoryComponent', () => {
  let component: SearchPageCategoryComponent;
  let fixture: ComponentFixture<SearchPageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
