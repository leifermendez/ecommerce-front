import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarCartComponent } from './side-bar-cart.component';

describe('SideBarCartComponent', () => {
  let component: SideBarCartComponent;
  let fixture: ComponentFixture<SideBarCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
