import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilterAttributesComponent } from './modal-filter-attributes.component';

describe('ModalFilterAttributesComponent', () => {
  let component: ModalFilterAttributesComponent;
  let fixture: ComponentFixture<ModalFilterAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilterAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilterAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
