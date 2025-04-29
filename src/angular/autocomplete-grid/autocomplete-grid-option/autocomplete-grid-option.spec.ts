import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridOption } from './autocomplete-grid-option';

describe('sbb-autocomplete-grid-option', () => {
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
  template: `<sbb-autocomplete-grid-option></sbb-autocomplete-grid-option>`,
  imports: [SbbAutocompleteGridOption],
})
class TestComponent {}
