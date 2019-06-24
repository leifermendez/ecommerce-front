import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGalleryProductVariationComponent } from './data-gallery-product-variation.component';

describe('DataGalleryProductVariationComponent', () => {
  let component: DataGalleryProductVariationComponent;
  let fixture: ComponentFixture<DataGalleryProductVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGalleryProductVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGalleryProductVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
