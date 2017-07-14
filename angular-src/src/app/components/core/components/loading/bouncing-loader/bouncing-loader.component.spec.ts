import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncingLoaderComponent } from './bouncing-loader.component';

describe('BouncingLoaderComponent', () => {
  let component: BouncingLoaderComponent;
  let fixture: ComponentFixture<BouncingLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BouncingLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BouncingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
