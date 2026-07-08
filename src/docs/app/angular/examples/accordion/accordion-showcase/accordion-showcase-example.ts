import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-accordion with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-accordion-showcase-example',
  templateUrl: 'accordion-showcase-example.html',
  imports: [SbbAccordionModule, SbbCheckboxModule, SbbTitleModule, FormField],
})
export class AccordionShowcaseExample {
  protected controls = form(
    signal({
      multi: false,
      smallSize: false,
      iconPanel: false,
      disablePanel: false,
    }),
  );
}
