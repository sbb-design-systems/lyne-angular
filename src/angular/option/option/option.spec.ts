import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbOptionDirective } from './option.js';

describe('SbbOptionDirective', () => {
  let component: SbbOptionDirective;
  let fixture: ComponentFixture<SbbOptionDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbOptionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
