import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCardButtonDirective } from './card-button.js';

describe('SbbCardButtonDirective', () => {
  let component: SbbCardButtonDirective;
  let fixture: ComponentFixture<SbbCardButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCardButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
