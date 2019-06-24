import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingApatxeeComponent } from './loading-apatxee.component';

describe('LoadingApatxeeComponent', () => {
  let component: LoadingApatxeeComponent;
  let fixture: ComponentFixture<LoadingApatxeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingApatxeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingApatxeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
