import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogContentDirective } from './dialog-content.js';

describe('SbbDialogContentDirective', () => {
  let component: SbbDialogContentDirective;
  let fixture: ComponentFixture<SbbDialogContentDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDialogContentDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
