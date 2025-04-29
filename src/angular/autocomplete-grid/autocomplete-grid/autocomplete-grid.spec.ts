import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAutocompleteGrid } from './autocomplete-grid';

describe('sbb-autocomplete-grid', () => {
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
  template: `<sbb-autocomplete-grid></sbb-autocomplete-grid>`,
  imports: [SbbAutocompleteGrid],
})
class TestComponent {}
