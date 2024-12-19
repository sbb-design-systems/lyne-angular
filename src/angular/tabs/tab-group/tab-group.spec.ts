import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTabGroupDirective } from './tab-group.js';

describe('SbbTabGroupDirective', () => {
  let component: SbbTabGroupDirective;
  let fixture: ComponentFixture<SbbTabGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTabGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
