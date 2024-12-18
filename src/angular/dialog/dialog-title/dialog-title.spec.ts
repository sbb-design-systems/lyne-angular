import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogTitleDirective } from './dialog-title.js';

describe('SbbDialogTitleDirective', () => {
  let component: SbbDialogTitleDirective;
  let fixture: ComponentFixture<SbbDialogTitleDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDialogTitleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
