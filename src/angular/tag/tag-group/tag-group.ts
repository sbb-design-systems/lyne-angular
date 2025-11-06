import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTagGroupElement } from '@sbb-esta/lyne-elements/tag/tag-group.js';
import type { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag/tag.js';

import '@sbb-esta/lyne-elements/tag/tag-group.js';

/**
 * It can be used as a container for one or more `sbb-tag`.
 *
 * @slot  - Use the unnamed slot to add one or more 'sbb-tag' elements to the `sbb-tag-group`.
 */
@Directive({
  selector: 'sbb-tag-group',
  exportAs: 'sbbTagGroup',
})
export class SbbTagGroup<T = string> {
  #element: ElementRef<SbbTagGroupElement<T>> = inject(ElementRef<SbbTagGroupElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * This will be forwarded as aria-label to the inner list.
   */
  @Input()
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
  }

  /**
   * If set multiple to false, the selection is exclusive and the value is a string (or null).
   * If set multiple to true, the selection can have multiple values and therefore value is an array.
   *
   * Changing multiple during run time is not supported.
   */
  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  /**
   * Tag group size, either s or m.
   */
  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  /**
   * Value of the sbb-tag-group.
   * If set multiple to false, the value is a string (or null).
   * If set multiple to true, the value is an array.
   */
  @Input()
  public set value(value: T | (T | null)[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | (T | null)[] | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  /**
   * The child instances of sbb-tag as an array.
   */
  public get tags(): SbbTagElement<T>[] {
    return this.#element.nativeElement.tags;
  }
}
