import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAddressComponent } from './info-address.component';

describe('InfoAddressComponent', () => {
  let component: InfoAddressComponent;
  let fixture: ComponentFixture<InfoAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
