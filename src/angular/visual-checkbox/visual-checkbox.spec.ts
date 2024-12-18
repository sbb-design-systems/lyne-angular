import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbVisualCheckboxDirective } from './visual-checkbox.js';

describe('SbbVisualCheckboxDirective', () => {
  let component: SbbVisualCheckboxDirective;
  let fixture: ComponentFixture<SbbVisualCheckboxDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbVisualCheckboxDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
