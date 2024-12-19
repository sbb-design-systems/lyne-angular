import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFlipCardSummaryDirective } from './flip-card-summary.js';

describe('SbbFlipCardSummaryDirective', () => {
  let component: SbbFlipCardSummaryDirective;
  let fixture: ComponentFixture<SbbFlipCardSummaryDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFlipCardSummaryDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
