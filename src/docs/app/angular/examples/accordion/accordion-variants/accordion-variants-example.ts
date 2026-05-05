import type { WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-accordion with properties
 */
@Component({
  selector: 'sbb-accordion-variants-example',
  templateUrl: 'accordion-variants-example.html',
  styleUrls: ['accordion-variants-example.scss'],
  imports: [SbbAccordionModule, SbbCheckbox, SbbTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionVariantsExample {
  multi = signal(false);
  disablePanel = signal(false);
  iconPanel = signal(false);
  size: WritableSignal<'s' | 'l'> = signal('l');

  setSize(x: boolean): void {
    this.size.set(x ? 's' : 'l');
  }
}
