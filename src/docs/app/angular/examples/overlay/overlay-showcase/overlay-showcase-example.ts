import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbOverlayModule } from '@sbb-esta/lyne-angular/overlay';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title overlay with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-overlay-showcase-example',
  templateUrl: 'overlay-showcase-example.html',
  imports: [
    FormField,
    SbbOverlayModule,
    SbbImageModule,
    SbbCardModule,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbTitleModule,
  ],
})
export class OverlayShowcaseExample {
  protected controls = form(
    signal({
      expanded: false,
      negative: false,
    }),
  );
}
