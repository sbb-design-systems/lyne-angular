import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCheckboxGroupDirective } from './checkbox-group.js';

describe('SbbCheckboxGroupDirective', () => {
  let component: SbbCheckboxGroupDirective;
  let fixture: ComponentFixture<SbbCheckboxGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCheckboxGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
