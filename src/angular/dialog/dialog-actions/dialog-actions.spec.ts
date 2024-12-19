import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogActionsDirective } from './dialog-actions.js';

describe('SbbDialogActionsDirective', () => {
  let component: SbbDialogActionsDirective;
  let fixture: ComponentFixture<SbbDialogActionsDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDialogActionsDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
