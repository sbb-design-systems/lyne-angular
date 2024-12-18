import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbToastDirective } from './toast.js';

describe('SbbToastDirective', () => {
  let component: SbbToastDirective;
  let fixture: ComponentFixture<SbbToastDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbToastDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
