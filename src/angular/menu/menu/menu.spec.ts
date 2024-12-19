import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMenuDirective } from './menu.js';

describe('SbbMenuDirective', () => {
  let component: SbbMenuDirective;
  let fixture: ComponentFixture<SbbMenuDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
