import { DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';
import { SbbPearlChainModule } from '@sbb-esta/lyne-angular/pearl-chain';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type {
  SbbPearlChainNodeElement,
  SbbPearlChainNodeType,
} from '@sbb-esta/lyne-elements/pearl-chain.pure.js';

import { at } from '../pearl-chain-example-util';

/**
 * @title horizontal pearl-chain with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-pearl-chain-horizontal-showcase-example',
  templateUrl: 'pearl-chain-horizontal-showcase-example.html',
  styleUrl: 'pearl-chain-horizontal-showcase-example.scss',
  imports: [
    DatePipe,
    FormField,
    SbbFormFieldModule,
    SbbOptionModule,
    SbbPearlChainModule,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbTimeInputModule,
    SbbTitleModule,
  ],
})
export class PearlChainHorizontalShowcaseExample {
  protected readonly types: SbbPearlChainNodeType[] = [
    'start',
    'end',
    'stop',
    'skip',
    'commercial',
    'boarding',
    'alighting',
    'exceptional',
    'exceptional-skip',
    'exceptional-boarding',
    'exceptional-alighting',
    'stop-duty',
    'stop-on-demand',
    'boarding-on-demand',
    'alighting-on-demand',
  ];
  protected readonly flagControls = ['disrupted', 'irrelevant', 'walk', 'unsure'] as const;

  protected readonly start = at(10, 0);
  protected readonly middle = at(12, 0);
  protected readonly end = at(15, 0);

  // The time-input yields a date on 1970-01-01; move it to today to match the node times.
  protected readonly todayNow = computed(() => {
    const time = this.controls.now().value();
    return at(time.getHours(), time.getMinutes());
  });

  protected controls = form(
    signal({
      type: 'stop' as SbbPearlChainNodeType,
      now: new Date(),
      disrupted: null as SbbPearlChainNodeElement['disrupted'],
      irrelevant: null as SbbPearlChainNodeElement['irrelevant'],
      walk: null as SbbPearlChainNodeElement['walk'],
      unsure: null as SbbPearlChainNodeElement['unsure'],
    }),
  );
}
