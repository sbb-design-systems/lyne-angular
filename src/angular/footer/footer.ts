/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbFooterElement } from '@sbb-esta/lyne-elements/footer.js';
import '@sbb-esta/lyne-elements/footer.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-footer',
  standalone: true,
})
export class SbbFooterDirective {
  #element: ElementRef<SbbFooterElement> = inject(ElementRef<SbbFooterElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set variant(value: 'default' | 'clock-columns') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.variant = value));
  }
  public get variant(): 'default' | 'clock-columns' {
    return this.#element.nativeElement.variant;
  }

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-title' })
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-title-level' })
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}