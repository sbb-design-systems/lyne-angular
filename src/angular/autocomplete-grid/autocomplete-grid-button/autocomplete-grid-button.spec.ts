import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridButtonDirective } from './autocomplete-grid-button.js';

describe('SbbAutocompleteGridButtonDirective', () => {
  let component: SbbAutocompleteGridButtonDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
