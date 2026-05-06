import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';

/**
 * @title Wizard-like sbb-accordion
 */
@Component({
  selector: 'sbb-accordion-wizard-example',
  templateUrl: 'accordion-wizard-example.html',
  imports: [SbbAccordionModule, SbbButtonModule, SbbActionGroupModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionWizardExample {
  protected step = signal(0);

  protected setStep(index: number) {
    this.step.set(index);
  }

  protected nextStep() {
    this.step.update((i) => i + 1);
  }

  protected prevStep() {
    this.step.update((i) => i - 1);
  }
}
