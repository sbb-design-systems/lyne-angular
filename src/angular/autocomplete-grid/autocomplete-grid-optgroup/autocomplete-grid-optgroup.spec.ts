import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridOptgroup } from './autocomplete-grid-optgroup';

describe('sbb-autocomplete-grid-optgroup', () => {
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
  template: `<sbb-autocomplete-grid-optgroup></sbb-autocomplete-grid-optgroup>`,
  imports: [SbbAutocompleteGridOptgroup],
})
class TestComponent {}
