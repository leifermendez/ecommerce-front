import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaImageShopComponent } from './media-image-shop.component';

describe('MediaImageShopComponent', () => {
  let component: MediaImageShopComponent;
  let fixture: ComponentFixture<MediaImageShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaImageShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaImageShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
