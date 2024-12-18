import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSecondaryButtonDirective } from './secondary-button.js';

describe('SbbSecondaryButtonDirective', () => {
  let component: SbbSecondaryButtonDirective;
  let fixture: ComponentFixture<SbbSecondaryButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSecondaryButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
