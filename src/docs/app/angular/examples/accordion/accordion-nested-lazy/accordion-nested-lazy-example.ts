import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';

/**
 * @title Nested sbb-accordion with lazy-loaded content
 */
@Component({
  selector: 'sbb-accordion-nested-lazy-example',
  templateUrl: 'accordion-nested-lazy-example.html',
  imports: [SbbAccordionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionNestedLazyExample {}
