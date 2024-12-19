import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSelectDirective } from './select.js';

describe('SbbSelectDirective', () => {
  let component: SbbSelectDirective;
  let fixture: ComponentFixture<SbbSelectDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSelectDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
