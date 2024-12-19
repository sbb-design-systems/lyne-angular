import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridDirective } from './autocomplete-grid.js';

describe('SbbAutocompleteGridDirective', () => {
  let component: SbbAutocompleteGridDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
