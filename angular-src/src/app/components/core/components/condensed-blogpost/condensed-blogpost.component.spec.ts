import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensedBlogpostComponent } from './condensed-blogpost.component';

describe('CondensedBlogpostComponent', () => {
  let component: CondensedBlogpostComponent;
  let fixture: ComponentFixture<CondensedBlogpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondensedBlogpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensedBlogpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
