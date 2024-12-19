import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFormErrorDirective } from './form-error.js';

describe('SbbFormErrorDirective', () => {
  let component: SbbFormErrorDirective;
  let fixture: ComponentFixture<SbbFormErrorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFormErrorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
