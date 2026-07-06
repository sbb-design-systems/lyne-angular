import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { type SbbBlockLink, SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title block-links with configurable properties
 * @order 2
 */
@Component({
  selector: 'sbb-block-link-showcase-example',
  templateUrl: 'block-link-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbLinkModule,
    SbbTitleModule,
    SbbRadioButtonModule,
  ],
})
export class BlockLinkShowcaseExample {
  protected controls = form(
    signal({
      disabled: false,
      negative: false,
      size: null as SbbBlockLink['size'],
      withIcon: false,
      iconPlacement: 'start' as SbbBlockLink['iconPlacement'],
    }),
    (schemaPath) => {
      disabled(schemaPath.iconPlacement, {
        when: ({ valueOf }) => !valueOf(schemaPath.withIcon),
      });
    },
  );
}
