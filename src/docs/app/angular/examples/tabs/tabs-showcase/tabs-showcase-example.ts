import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbTabGroup, SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbTabChangeEvent } from '@sbb-esta/lyne-elements/tabs.pure.js';

/**
 * @title Showcase tabs
 * @order 1
 */
@Component({
  selector: 'sbb-tabs-showcase-example',
  templateUrl: 'tabs-showcase-example.html',
  imports: [
    SbbTabsModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    FormField,
    SbbCard,
  ],
})
export class TabsShowcaseExample {
  protected tabChangeEvent = signal<SbbTabChangeEvent | null>(null);

  protected tabGroupControls = form(
    signal({
      size: null as SbbTabGroup['size'],
    }),
  );
  protected tabLabelControls = form(
    signal({
      icon: true,
      amount: '123',
    }),
  );

  protected tabChanged(event: SbbTabChangeEvent) {
    this.tabChangeEvent.set(event);
    console.log(event);
  }
}
