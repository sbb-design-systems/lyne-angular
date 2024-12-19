import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMenuButtonDirective } from './menu-button.js';

describe('SbbMenuButtonDirective', () => {
  let component: SbbMenuButtonDirective;
  let fixture: ComponentFixture<SbbMenuButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMenuButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
