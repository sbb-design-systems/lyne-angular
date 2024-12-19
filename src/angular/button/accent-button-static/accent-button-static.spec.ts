import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccentButtonStaticDirective } from './accent-button-static.js';

describe('SbbAccentButtonStaticDirective', () => {
  let component: SbbAccentButtonStaticDirective;
  let fixture: ComponentFixture<SbbAccentButtonStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAccentButtonStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
