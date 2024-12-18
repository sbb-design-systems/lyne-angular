import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbRadioButtonGroupDirective } from './radio-button-group.js';

describe('SbbRadioButtonGroupDirective', () => {
  let component: SbbRadioButtonGroupDirective;
  let fixture: ComponentFixture<SbbRadioButtonGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbRadioButtonGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
