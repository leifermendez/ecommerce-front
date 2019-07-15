import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVariationsProductComponent } from './modal-variations-product.component';

describe('ModalVariationsProductComponent', () => {
  let component: ModalVariationsProductComponent;
  let fixture: ComponentFixture<ModalVariationsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVariationsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVariationsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
