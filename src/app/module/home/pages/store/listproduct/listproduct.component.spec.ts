import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductComponent } from './listproduct.component';

describe('ListproductComponent', () => {
  let component: ListproductComponent;
  let fixture: ComponentFixture<ListproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
