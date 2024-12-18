import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFormFieldDirective } from './form-field.js';

describe('SbbFormFieldDirective', () => {
  let component: SbbFormFieldDirective;
  let fixture: ComponentFixture<SbbFormFieldDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFormFieldDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
