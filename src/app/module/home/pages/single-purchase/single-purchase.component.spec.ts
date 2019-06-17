import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePurchaseComponent } from './single-purchase.component';

describe('SinglePurchaseComponent', () => {
  let component: SinglePurchaseComponent;
  let fixture: ComponentFixture<SinglePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
