import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadingSpinnerComponent } from './fading-spinner.component';

describe('FadingSpinnerComponent', () => {
  let component: FadingSpinnerComponent;
  let fixture: ComponentFixture<FadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
