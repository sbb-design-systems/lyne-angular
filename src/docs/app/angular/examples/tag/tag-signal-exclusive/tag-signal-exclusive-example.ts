import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title Exclusive tag group with signal forms
 * @order 13
 */
@Component({
  selector: 'sbb-tag-signal-exclusive-example',
  templateUrl: 'tag-signal-exclusive-example.html',
  imports: [SbbTagModule, SbbCardModule, FormField, TitleCasePipe],
})
export class TagSignalExclusiveExample {
  protected devices = ['phones', 'computers', 'tablets'] as const;

  protected form = form(
    signal(
      Object.fromEntries(this.devices.map((device) => [device, false])) as Record<
        (typeof this.devices)[number],
        boolean
      >,
    ),
  );

  protected selectedDevice = computed(
    () => Object.entries(this.form().value()).find(([_, value]) => value)?.[0] ?? null,
  );
}
