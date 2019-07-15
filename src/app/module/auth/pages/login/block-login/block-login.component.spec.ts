import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoginComponent } from './block-login.component';

describe('BlockLoginComponent', () => {
  let component: BlockLoginComponent;
  let fixture: ComponentFixture<BlockLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
