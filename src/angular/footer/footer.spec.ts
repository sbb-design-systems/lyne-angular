import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFooterDirective } from './footer.js';

describe('SbbFooterDirective', () => {
  let component: SbbFooterDirective;
  let fixture: ComponentFixture<SbbFooterDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFooterDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
