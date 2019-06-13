import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardOverlayComponent } from './wizard-overlay.component';

describe('WizardOverlayComponent', () => {
  let component: WizardOverlayComponent;
  let fixture: ComponentFixture<WizardOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
