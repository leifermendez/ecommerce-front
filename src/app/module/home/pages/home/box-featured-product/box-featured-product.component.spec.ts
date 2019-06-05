import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFeaturedProductComponent } from './box-featured-product.component';

describe('BoxFeaturedProductComponent', () => {
  let component: BoxFeaturedProductComponent;
  let fixture: ComponentFixture<BoxFeaturedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFeaturedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFeaturedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
