import { Injectable, signal } from '@angular/core';
import type { ElementRef } from '@angular/core';

/**
 * Service that tracks the deepest nested scroll origin element using a stack.
 * Sidebar content directives push themselves on init and pop on destroy, so
 * when the deepest element is removed the next one in the stack takes over.
 */
@Injectable({ providedIn: 'root' })
export class ScrollOrigin {
  #scrollOriginElements: HTMLElement[] = [];
  readonly scrollOrigin = signal<HTMLElement | null>(null);

  register(elementRef: ElementRef<HTMLElement>): void {
    this.#scrollOriginElements.push(elementRef.nativeElement);
    this.scrollOrigin.set(elementRef.nativeElement);
  }

  unregister(elementRef: ElementRef<HTMLElement>): void {
    this.#scrollOriginElements = this.#scrollOriginElements.filter(
      (el) => el !== elementRef.nativeElement,
    );
    this.scrollOrigin.set(this.#scrollOriginElements.at(-1) ?? null);
  }
}
