import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ViewContainerRef,
  ChangeDetectorRef,
  contentChild,
  type InjectionToken,
  TemplateRef,
  type OutputRef,
  inject,
  ElementRef,
} from '@angular/core';
import { outputFromObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type {
  SbbStepLabelElement,
  SbbStepElement,
  SbbStepperElement,
  SbbStepValidateEvent,
} from '@sbb-esta/lyne-elements/stepper.js';
import { fromEvent, NEVER } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import type { SbbStepContent } from './step-content';
import { SBB_STEP_CONTENT } from './step-content';

import '@sbb-esta/lyne-elements/stepper.js';

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot  - Use the unnamed slot to provide content.
 */
@Component({
  selector: 'sbb-step',
  exportAs: 'sbbStep',
  imports: [CdkPortalOutlet],
  template: `
    <ng-template [cdkPortalOutlet]="contentPortal"></ng-template>
    <ng-content></ng-content>
  `,
})
export class SbbStep {
  #element: ElementRef<SbbStepElement> = inject(ElementRef<SbbStepElement>);
  #viewContainerRef = inject(ViewContainerRef);
  #changeDetectorRef = inject(ChangeDetectorRef);

  protected contentPortal: TemplatePortal | null = null;

  private _explicitContent = contentChild<InjectionToken<SbbStepContent>, TemplateRef<unknown>>(
    SBB_STEP_CONTENT,
    {
      read: TemplateRef,
    },
  );

  /**
   * The label of the step.
   */
  public get label(): SbbStepLabelElement | null {
    return this.#element.nativeElement.label;
  }

  public get stepper(): SbbStepperElement | null {
    return this.#element.nativeElement.stepper;
  }

  protected _validateOutput: OutputRef<SbbStepValidateEvent> =
    outputFromObservable<SbbStepValidateEvent>(NEVER, { alias: 'validate' });

  /**
   * The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change.
   */
  public validateOutput: OutputRef<SbbStepValidateEvent> = internalOutputFromObservable(
    fromEvent<SbbStepValidateEvent>(this.#element.nativeElement, 'validate'),
  );

  constructor() {
    const contentChildObservable = toObservable(this._explicitContent);
    fromEvent<Event>(this.#element.nativeElement, 'active')
      .pipe(
        switchMap(() => contentChildObservable),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((templateRef) => {
        this.contentPortal = templateRef
          ? new TemplatePortal(templateRef, this.#viewContainerRef)
          : null;
        this.#changeDetectorRef.markForCheck();
      });
  }
}
