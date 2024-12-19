import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbJourneySummaryDirective } from './journey-summary.js';

describe('SbbJourneySummaryDirective', () => {
  let component: SbbJourneySummaryDirective;
  let fixture: ComponentFixture<SbbJourneySummaryDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbJourneySummaryDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
