import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteDirective } from './autocomplete.js';

describe('SbbAutocompleteDirective', () => {
  let component: SbbAutocompleteDirective;
  let fixture: ComponentFixture<SbbAutocompleteDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAutocompleteDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
