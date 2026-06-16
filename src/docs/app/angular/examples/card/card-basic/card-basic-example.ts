import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { type SbbCard, type SbbCardBadge, SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

type CardSpacing = '3x-xxs' | 'xxxs-xxs' | 'xxxs-s' | '4x-xxs' | 'xxs' | 's' | 'l' | null;

/**
 * @title Basic card
 * @order 1
 */
@Component({
  selector: 'sbb-card-basic-example',
  templateUrl: 'card-basic-example.html',
  imports: [FormField, SbbCardModule, SbbRadioButtonModule, SbbTitleModule],
})
export class CardBasicExample {
  protected controls = form(
    signal({
      color: 'milk' as SbbCard['color'],
      spacing: null as CardSpacing,
      badgeColor: 'charcoal' as SbbCardBadge['color'],
    }),
  );
}
