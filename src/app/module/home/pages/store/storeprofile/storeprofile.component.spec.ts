import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreprofileComponent } from './storeprofile.component';

describe('StoreprofileComponent', () => {
  let component: StoreprofileComponent;
  let fixture: ComponentFixture<StoreprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
