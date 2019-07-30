import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventWizardComponent } from './prevent-wizard.component';

describe('PreventWizardComponent', () => {
  let component: PreventWizardComponent;
  let fixture: ComponentFixture<PreventWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
