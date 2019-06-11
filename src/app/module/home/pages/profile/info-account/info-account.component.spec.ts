import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAccountComponent } from './info-account.component';

describe('InfoAccountComponent', () => {
  let component: InfoAccountComponent;
  let fixture: ComponentFixture<InfoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
