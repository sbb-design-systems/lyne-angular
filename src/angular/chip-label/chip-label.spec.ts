import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbChipLabelDirective } from './chip-label.js';

describe('SbbChipLabelDirective', () => {
  let component: SbbChipLabelDirective;
  let fixture: ComponentFixture<SbbChipLabelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbChipLabelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
