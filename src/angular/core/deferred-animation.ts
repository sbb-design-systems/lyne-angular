import { Directive, ElementRef, inject, type AfterViewInit } from '@angular/core';
import type { LitElement } from 'lit';

/**
 * When using some components together with Angular Router, the initial animation can be visible.
 * Applying this directive to a component will defer the animation until the component is fully rendered.
 */
@Directive()
export class SbbDeferredAnimation implements AfterViewInit {
  #element: ElementRef<LitElement> = inject(ElementRef);

  constructor() {
    // Ensure that the animation is disabled on initialization. It's activated again in the AfterViewInit hook.
    if (!this.#element.nativeElement.classList.contains('sbb-disable-animation')) {
      this.#element.nativeElement.classList.add(
        'sbb-disable-animation',
        'sbb-deferred-animation-init',
      );
    }
  }

  ngAfterViewInit(): void {
    this.#element.nativeElement.updateComplete.then(() => {
      if (this.#element.nativeElement.classList.contains('sbb-deferred-animation-init')) {
        this.#element.nativeElement.classList.remove(
          'sbb-disable-animation',
          'sbb-deferred-animation-init',
        );
      }
    });
  }
}
