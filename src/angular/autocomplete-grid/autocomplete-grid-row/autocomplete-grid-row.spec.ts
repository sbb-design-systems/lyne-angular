import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbAutocompleteGridRowElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-row.js';

import { SbbAutocompleteGridRow } from './autocomplete-grid-row';

describe('sbb-autocomplete-grid-row', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbAutocompleteGridRowElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-autocomplete-grid-row');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-autocomplete-grid-row',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-autocomplete-grid-row></sbb-autocomplete-grid-row>`,
  imports: [SbbAutocompleteGridRow],
})
class TestComponent {}
