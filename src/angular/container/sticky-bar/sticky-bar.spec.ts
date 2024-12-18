import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbStickyBarDirective } from './sticky-bar.js';

describe('SbbStickyBarDirective', () => {
  let component: SbbStickyBarDirective;
  let fixture: ComponentFixture<SbbStickyBarDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbStickyBarDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
