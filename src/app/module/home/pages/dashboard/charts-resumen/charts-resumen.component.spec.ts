import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsResumenComponent } from './charts-resumen.component';

describe('ChartsResumenComponent', () => {
  let component: ChartsResumenComponent;
  let fixture: ComponentFixture<ChartsResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
