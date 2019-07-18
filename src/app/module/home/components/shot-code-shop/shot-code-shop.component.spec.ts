import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotCodeShopComponent } from './shot-code-shop.component';

describe('ShotCodeShopComponent', () => {
  let component: ShotCodeShopComponent;
  let fixture: ComponentFixture<ShotCodeShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShotCodeShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotCodeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
