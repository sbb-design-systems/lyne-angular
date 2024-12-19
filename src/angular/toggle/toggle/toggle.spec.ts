import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbToggleDirective } from './toggle.js';

describe('SbbToggleDirective', () => {
  let component: SbbToggleDirective;
  let fixture: ComponentFixture<SbbToggleDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbToggleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
