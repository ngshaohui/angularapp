import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureReelComponent } from './feature-reel.component';

describe('FeatureReelComponent', () => {
  let component: FeatureReelComponent;
  let fixture: ComponentFixture<FeatureReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
