import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbAutocompleteGridCellElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-cell.js';

import { SbbAutocompleteGridCell } from './autocomplete-grid-cell';

describe('sbb-autocomplete-grid-cell', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbAutocompleteGridCellElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-autocomplete-grid-cell');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-autocomplete-grid-cell',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-autocomplete-grid-cell></sbb-autocomplete-grid-cell>`,
  imports: [SbbAutocompleteGridCell],
})
class TestComponent {}
