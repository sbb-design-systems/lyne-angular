import { Directive, ElementRef, inject } from '@angular/core';

@Directive()
export class SbbTriggerBase<T extends { trigger: unknown }, E = HTMLElement> {
  #element = inject<ElementRef<E>>(ElementRef);

  protected get referenceElement(): T | null {
    return this.#referenceElement;
  }
  protected set referenceElement(element: T | null) {
    this.#referenceElement = element;
    if (this.#referenceElement) {
      this.#referenceElement.trigger = this.#element.nativeElement;
    }
  }
  #referenceElement: T | null = null;
}
