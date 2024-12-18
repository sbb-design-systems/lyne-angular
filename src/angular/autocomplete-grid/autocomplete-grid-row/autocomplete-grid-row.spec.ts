import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridRowDirective } from './autocomplete-grid-row.js';

describe('SbbAutocompleteGridRowDirective', () => {
  let component: SbbAutocompleteGridRowDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridRowDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridRowDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
