import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbHeaderButtonDirective } from './header-button.js';

describe('SbbHeaderButtonDirective', () => {
  let component: SbbHeaderButtonDirective;
  let fixture: ComponentFixture<SbbHeaderButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbHeaderButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
