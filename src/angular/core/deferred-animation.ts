import { Directive, ElementRef, inject, type OnInit } from '@angular/core';

@Directive()
export class SbbDeferredAnimation implements OnInit {
  #element: ElementRef = inject(ElementRef);

  constructor() {
    // Ensure that the animation is disabled on initialization. OnInit it can be activated again.
    if (!this.#element.nativeElement.classList.contains('sbb-disable-animation')) {
      this.#element.nativeElement.classList.add(
        'sbb-disable-animation',
        'sbb-deferred-animation-init',
      );
    }
  }

  ngOnInit(): void {
    if (this.#element.nativeElement.classList.contains('sbb-deferred-animation-init')) {
      this.#element.nativeElement.classList.remove(
        'sbb-disable-animation',
        'sbb-deferred-animation-init',
      );
    }
  }
}
