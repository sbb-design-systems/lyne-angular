import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbOptGroupDirective } from './optgroup.js';

describe('SbbOptGroupDirective', () => {
  let component: SbbOptGroupDirective;
  let fixture: ComponentFixture<SbbOptGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbOptGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
