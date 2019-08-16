import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredComponent } from './referred.component';

describe('ReferredComponent', () => {
  let component: ReferredComponent;
  let fixture: ComponentFixture<ReferredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
