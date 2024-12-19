import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbButtonDirective } from './button.js';

describe('SbbButtonDirective', () => {
  let component: SbbButtonDirective;
  let fixture: ComponentFixture<SbbButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
