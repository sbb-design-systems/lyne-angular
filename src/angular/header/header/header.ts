/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbHeaderElement } from '@sbb-esta/lyne-elements/header/header.js';
import '@sbb-esta/lyne-elements/header/header.js';

@Directive({
  selector: 'sbb-header',
  standalone: true,
})
export class SbbHeaderDirective {
  #element: ElementRef<SbbHeaderElement> = inject(ElementRef<SbbHeaderElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'scroll-origin' })
  public set scrollOrigin(value: string | HTMLElement | Document) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.scrollOrigin = value));
  }
  public get scrollOrigin(): string | HTMLElement | Document {
    return this.#element.nativeElement.scrollOrigin;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'hide-on-scroll', transform: booleanAttribute })
  public set hideOnScroll(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideOnScroll = value));
  }
  public get hideOnScroll(): boolean {
    return this.#element.nativeElement.hideOnScroll;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }
}
