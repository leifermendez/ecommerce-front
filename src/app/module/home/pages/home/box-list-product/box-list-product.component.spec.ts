import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxListProductComponent } from './box-list-product.component';

describe('BoxListProductComponent', () => {
  let component: BoxListProductComponent;
  let fixture: ComponentFixture<BoxListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
