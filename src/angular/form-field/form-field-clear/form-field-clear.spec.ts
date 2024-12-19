import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFormFieldClearDirective } from './form-field-clear.js';

describe('SbbFormFieldClearDirective', () => {
  let component: SbbFormFieldClearDirective;
  let fixture: ComponentFixture<SbbFormFieldClearDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFormFieldClearDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
