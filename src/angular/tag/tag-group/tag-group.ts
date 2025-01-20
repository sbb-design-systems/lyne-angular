/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTagGroupElement } from '@sbb-esta/lyne-elements/tag/tag-group.js';
import '@sbb-esta/lyne-elements/tag/tag-group.js';
import { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag/tag.js';

@Directive({
  selector: 'sbb-tag-group',
  standalone: true,
})
export class SbbTagGroupDirective {
  #element: ElementRef<SbbTagGroupElement> = inject(ElementRef<SbbTagGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'list-accessibility-label' })
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
  }

  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set value(value: string | (string | null)[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | (string | null)[] | null {
    return this.#element.nativeElement.value;
  }

  public get tags(): SbbTagElement[] {
    return this.#element.nativeElement.tags;
  }
}
