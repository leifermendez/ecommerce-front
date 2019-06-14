import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoShopComponent } from './info-shop.component';

describe('InfoShopComponent', () => {
  let component: InfoShopComponent;
  let fixture: ComponentFixture<InfoShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
