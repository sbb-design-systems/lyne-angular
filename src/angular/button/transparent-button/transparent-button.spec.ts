import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTransparentButtonDirective } from './transparent-button.js';

describe('SbbTransparentButtonDirective', () => {
  let component: SbbTransparentButtonDirective;
  let fixture: ComponentFixture<SbbTransparentButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTransparentButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
