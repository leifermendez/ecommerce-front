import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipLocationComponent } from './zip-location.component';

describe('ZipLocationComponent', () => {
  let component: ZipLocationComponent;
  let fixture: ComponentFixture<ZipLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
