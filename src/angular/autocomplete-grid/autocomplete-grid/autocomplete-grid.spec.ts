import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocompleteGridButton } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';

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

  it('should open and close', async () => {
    const autocompleteGrid = component.autocomplete()!;
    autocompleteGrid.open();

    expect(autocompleteGrid.isOpen).toBeTrue();

    const option1 = fixture.debugElement.nativeElement.querySelector(
      'sbb-autocomplete-grid-option',
    );
    option1.click();

    expect(component.control.value).toEqual('option1');
    expect(autocompleteGrid.isOpen).toBeFalse();
  });
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Autocomplete</label>
    <input id="input" [formControl]="control" />
    <sbb-autocomplete-grid>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="option1">Option 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="dog-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="option2">Option 2</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="dog-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    </sbb-autocomplete-grid>
  </sbb-form-field>`,
  imports: [
    SbbFormField,
    SbbAutocompleteGrid,
    SbbAutocompleteGridRow,
    SbbAutocompleteGridOption,
    SbbAutocompleteGridCell,
    SbbAutocompleteGridButton,
    ReactiveFormsModule,
  ],
})
class TestComponent {
  autocomplete = viewChild(SbbAutocompleteGrid);
  control = new FormControl('');
}
