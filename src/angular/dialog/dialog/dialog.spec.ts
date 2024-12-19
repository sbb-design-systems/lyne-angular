import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogDirective } from './dialog.js';

describe('SbbDialogDirective', () => {
  let component: SbbDialogDirective;
  let fixture: ComponentFixture<SbbDialogDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDialogDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
