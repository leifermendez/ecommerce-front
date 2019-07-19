import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductStoreComponent } from './listproduct.component';

describe('ListProductStoreComponent', () => {
  let component: ListProductStoreComponent;
  let fixture: ComponentFixture<ListProductStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
