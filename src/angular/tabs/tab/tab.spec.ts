import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTabDirective } from './tab.js';

describe('SbbTabDirective', () => {
  let component: SbbTabDirective;
  let fixture: ComponentFixture<SbbTabDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTabDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
