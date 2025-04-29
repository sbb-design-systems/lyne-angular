import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbAutocompleteGridOptgroupElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';

import { SbbAutocompleteGridOptgroup } from './autocomplete-grid-optgroup';

describe('sbb-autocomplete-grid-optgroup', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbAutocompleteGridOptgroupElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-autocomplete-grid-optgroup');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-autocomplete-grid-optgroup',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-autocomplete-grid-optgroup></sbb-autocomplete-grid-optgroup>`,
  imports: [SbbAutocompleteGridOptgroup],
})
class TestComponent {}
