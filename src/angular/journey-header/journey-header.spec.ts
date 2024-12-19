import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbJourneyHeaderDirective } from './journey-header.js';

describe('SbbJourneyHeaderDirective', () => {
  let component: SbbJourneyHeaderDirective;
  let fixture: ComponentFixture<SbbJourneyHeaderDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbJourneyHeaderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
