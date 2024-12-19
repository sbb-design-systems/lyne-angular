import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCheckboxDirective } from './checkbox.js';

describe('SbbCheckboxDirective', () => {
  let component: SbbCheckboxDirective;
  let fixture: ComponentFixture<SbbCheckboxDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCheckboxDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
