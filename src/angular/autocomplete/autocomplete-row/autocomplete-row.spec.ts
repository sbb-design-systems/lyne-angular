import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteRow } from './autocomplete-row';

describe('sbb-autocomplete-row', () => {
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
  template: `<sbb-autocomplete-row></sbb-autocomplete-row>`,
  imports: [SbbAutocompleteRow],
})
class TestComponent {}
