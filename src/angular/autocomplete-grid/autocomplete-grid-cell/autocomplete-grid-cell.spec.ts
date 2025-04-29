import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridCell } from './autocomplete-grid-cell';

describe('sbb-autocomplete-grid-cell', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-autocomplete-grid-cell></sbb-autocomplete-grid-cell>`,
  imports: [SbbAutocompleteGridCell],
})
class TestComponent {}
