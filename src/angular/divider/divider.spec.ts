import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDividerDirective } from './divider.js';

describe('SbbDividerDirective', () => {
  let component: SbbDividerDirective;
  let fixture: ComponentFixture<SbbDividerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDividerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
