import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbRadioButtonDirective } from './radio-button.js';

describe('SbbRadioButtonDirective', () => {
  let component: SbbRadioButtonDirective;
  let fixture: ComponentFixture<SbbRadioButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbRadioButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
