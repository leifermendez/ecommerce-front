import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCifComponent } from './shop-cif.component';

describe('ShopCifComponent', () => {
  let component: ShopCifComponent;
  let fixture: ComponentFixture<ShopCifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
