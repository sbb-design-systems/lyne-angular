import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbButton, SbbSecondaryButton } from '@sbb-esta/lyne-angular/button';

/**
 * @title Wizard-like sbb-accordion
 */
@Component({
  selector: 'sbb-accordion-wizard-example',
  templateUrl: 'accordion-wizard-example.html',
  imports: [SbbAccordionModule, SbbButton, SbbSecondaryButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionWizardExample {
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }
}
