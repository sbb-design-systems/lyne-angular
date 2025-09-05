import { type AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import type { LitElement } from 'lit';

/**
 * When using some components together with Angular Router, the initial animation can be visible.
 * Applying this directive to a component will defer the animation until the component is fully rendered.
 */
@Directive()
export class SbbDeferredAnimation implements AfterViewInit {
  #element: ElementRef<LitElement> = inject(ElementRef);
  #disableAnimationClassSet: boolean = false;

  constructor() {
    // Ensure that the animation is disabled on initialization. It's activated again in the AfterViewInit hook.
    if (!this.#element.nativeElement.classList.contains('sbb-disable-animation')) {
      this.#element.nativeElement.classList.add('sbb-disable-animation');
      this.#disableAnimationClassSet = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.#disableAnimationClassSet) {
      this.#element.nativeElement.updateComplete.then(() => {
        this.#element.nativeElement.classList.remove('sbb-disable-animation');
      });
    }
  }
}
