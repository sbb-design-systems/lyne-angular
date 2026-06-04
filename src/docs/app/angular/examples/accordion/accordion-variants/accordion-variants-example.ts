import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-accordion with configurable properties
 */
@Component({
  selector: 'sbb-accordion-variants-example',
  templateUrl: 'accordion-variants-example.html',
  imports: [SbbAccordionModule, SbbCheckboxModule, SbbTitleModule, FormField],
})
export class AccordionVariantsExample {
  protected controls = form(
    signal({
      multi: false,
      smallSize: false,
      iconPanel: false,
      disablePanel: false,
    }),
  );
}
