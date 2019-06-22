import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProductComponent } from './data-product.component';

describe('DataProductComponent', () => {
  let component: DataProductComponent;
  let fixture: ComponentFixture<DataProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
