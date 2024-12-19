import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimeInputDirective } from './time-input.js';

describe('SbbTimeInputDirective', () => {
  let component: SbbTimeInputDirective;
  let fixture: ComponentFixture<SbbTimeInputDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTimeInputDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
