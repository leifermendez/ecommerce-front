import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniGalleryProductComponent } from './mini-gallery-product.component';

describe('MiniGalleryProductComponent', () => {
  let component: MiniGalleryProductComponent;
  let fixture: ComponentFixture<MiniGalleryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniGalleryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniGalleryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
