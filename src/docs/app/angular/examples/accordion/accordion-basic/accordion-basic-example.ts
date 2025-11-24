import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';

/**
 * @title Basic Accordion
 * @order 20
 */
@Component({
  selector: 'sbb-accordion-basic-example',
  templateUrl: 'accordion-basic-example.html',
  styleUrls: ['accordion-basic-example.scss'],
  imports: [SbbAccordionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBasicExample {}
