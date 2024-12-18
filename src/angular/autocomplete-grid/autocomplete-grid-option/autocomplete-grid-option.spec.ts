import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridOptionDirective } from './autocomplete-grid-option.js';

describe('SbbAutocompleteGridOptionDirective', () => {
  let component: SbbAutocompleteGridOptionDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridOptionDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridOptionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
