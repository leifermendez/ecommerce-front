import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVariationsProductComponent } from './data-variations-product.component';

describe('DataVariationsProductComponent', () => {
  let component: DataVariationsProductComponent;
  let fixture: ComponentFixture<DataVariationsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVariationsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVariationsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
