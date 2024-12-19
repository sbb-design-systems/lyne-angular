import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTableWrapperDirective } from './table-wrapper.js';

describe('SbbTableWrapperDirective', () => {
  let component: SbbTableWrapperDirective;
  let fixture: ComponentFixture<SbbTableWrapperDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTableWrapperDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
