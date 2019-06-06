import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxBlogComponent } from './box-blog.component';

describe('BoxBlogComponent', () => {
  let component: BoxBlogComponent;
  let fixture: ComponentFixture<BoxBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
