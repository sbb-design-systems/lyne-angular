import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';

/**
 * @title Basic sbb-accordion
 */
@Component({
  selector: 'sbb-accordion-basic-example',
  templateUrl: 'accordion-basic-example.html',
  imports: [SbbAccordionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBasicExample {}
