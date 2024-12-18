import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridCellDirective } from './autocomplete-grid-cell.js';

describe('SbbAutocompleteGridCellDirective', () => {
  let component: SbbAutocompleteGridCellDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridCellDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridCellDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
