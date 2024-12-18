import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbHeaderDirective } from './header.js';

describe('SbbHeaderDirective', () => {
  let component: SbbHeaderDirective;
  let fixture: ComponentFixture<SbbHeaderDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbHeaderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
