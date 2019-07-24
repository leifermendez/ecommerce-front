import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductGlobalComponent } from './list-product-global.component';

describe('ListProductGlobalComponent', () => {
  let component: ListProductGlobalComponent;
  let fixture: ComponentFixture<ListProductGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
