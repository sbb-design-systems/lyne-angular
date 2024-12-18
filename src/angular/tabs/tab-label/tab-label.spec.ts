import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTabLabelDirective } from './tab-label.js';

describe('SbbTabLabelDirective', () => {
  let component: SbbTabLabelDirective;
  let fixture: ComponentFixture<SbbTabLabelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTabLabelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
