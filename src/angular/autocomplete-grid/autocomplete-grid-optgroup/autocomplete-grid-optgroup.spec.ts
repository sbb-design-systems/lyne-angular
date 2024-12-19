import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridOptgroupDirective } from './autocomplete-grid-optgroup.js';

describe('SbbAutocompleteGridOptgroupDirective', () => {
  let component: SbbAutocompleteGridOptgroupDirective;
  let fixture: ComponentFixture<SbbAutocompleteGridOptgroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteGridOptgroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
