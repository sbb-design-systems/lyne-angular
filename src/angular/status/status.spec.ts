import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbStatusDirective } from './status.js';

describe('SbbStatusDirective', () => {
  let component: SbbStatusDirective;
  let fixture: ComponentFixture<SbbStatusDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbStatusDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
