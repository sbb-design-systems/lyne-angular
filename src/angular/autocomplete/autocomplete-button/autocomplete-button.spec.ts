import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteButton } from './autocomplete-button';

describe('sbb-autocomplete-button', () => {
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
  template: `<sbb-autocomplete-button></sbb-autocomplete-button>`,
  imports: [SbbAutocompleteButton],
})
class TestComponent {}
