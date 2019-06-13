import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoComponent } from './shop-info.component';

describe('ShopInfoComponent', () => {
  let component: ShopInfoComponent;
  let fixture: ComponentFixture<ShopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
