import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

// We test the deferred animation directive on the checkbox panel component
describe(`sbb-deferred-animation`, () => {
  let checkboxPanelElement: SbbCheckboxPanelElement;

  it('should have animation deferred', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    checkboxPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-checkbox-panel',
    )!;

    expect(checkboxPanelElement).toHaveClass('sbb-disable-animation');
    expect(checkboxPanelElement).toHaveClass('sbb-deferred-animation-init');
    await waitForLitRender(checkboxPanelElement);

    expect(checkboxPanelElement).not.toHaveClass('sbb-disable-animation');
    expect(checkboxPanelElement).not.toHaveClass('sbb-deferred-animation-init');
  });

  it('should not remove sbb-disable-animation class if it is already applied', async () => {
    const fixture = TestBed.createComponent(TestComponentWithDisabledAnimation);
    checkboxPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-checkbox-panel',
    )!;
    fixture.detectChanges();

    expect(checkboxPanelElement).toHaveClass('sbb-disable-animation');
    expect(checkboxPanelElement).not.toHaveClass('sbb-deferred-animation-init');
    await waitForLitRender(checkboxPanelElement);
    expect(checkboxPanelElement).toHaveClass('sbb-disable-animation');
    expect(checkboxPanelElement).not.toHaveClass('sbb-deferred-animation-init');
  });
});

@Component({
  template: `<div class="sbb-enable-animation">
    <sbb-checkbox-panel [checked]="true">Content</sbb-checkbox-panel>
  </div>`,
  imports: [SbbCheckboxPanel],
})
class TestComponent {}

@Component({
  template: `<sbb-checkbox-panel [checked]="true" class="sbb-disable-animation">
    Content
  </sbb-checkbox-panel>`,
  imports: [SbbCheckboxPanel],
})
class TestComponentWithDisabledAnimation {}
