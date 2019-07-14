import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShoppingComponent } from './modal-shopping.component';

describe('ModalShoppingComponent', () => {
  let component: ModalShoppingComponent;
  let fixture: ComponentFixture<ModalShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
