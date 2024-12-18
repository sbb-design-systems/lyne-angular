import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccordionDirective } from './accordion.js';

describe('SbbAccordionDirective', () => {
  let component: SbbAccordionDirective;
  let fixture: ComponentFixture<SbbAccordionDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAccordionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
