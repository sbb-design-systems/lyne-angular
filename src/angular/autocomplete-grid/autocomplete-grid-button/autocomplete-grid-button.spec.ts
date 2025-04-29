import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGridButton } from './autocomplete-grid-button';

describe('sbb-autocomplete-grid-button', () => {
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
  template: `<sbb-autocomplete-grid-button></sbb-autocomplete-grid-button>`,
  imports: [SbbAutocompleteGridButton],
})
class TestComponent {}
