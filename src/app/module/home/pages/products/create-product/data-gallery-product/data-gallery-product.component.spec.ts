import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGalleryProductComponent } from './data-gallery-product.component';

describe('DataGalleryProductComponent', () => {
  let component: DataGalleryProductComponent;
  let fixture: ComponentFixture<DataGalleryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGalleryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGalleryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
