import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLeadContainerDirective } from './lead-container.js';

describe('SbbLeadContainerDirective', () => {
  let component: SbbLeadContainerDirective;
  let fixture: ComponentFixture<SbbLeadContainerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLeadContainerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
