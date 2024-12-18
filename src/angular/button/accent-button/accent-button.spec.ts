import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccentButtonDirective } from './accent-button.js';

describe('SbbAccentButtonDirective', () => {
  let component: SbbAccentButtonDirective;
  let fixture: ComponentFixture<SbbAccentButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAccentButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
