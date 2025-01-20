import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbNavigationButtonElement } from '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import { SbbNavigationActionSize } from '@sbb-esta/lyne-elements/navigation.js';

@Directive({
  selector: 'sbb-navigation-button',
})
export class SbbNavigationButton {
  #element: ElementRef<SbbNavigationButtonElement> = inject(ElementRef<SbbNavigationButtonElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: SbbNavigationActionSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbNavigationActionSize {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set connectedSection(value: SbbNavigationSectionElement | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.connectedSection = value));
  }
  public get connectedSection(): SbbNavigationSectionElement | undefined {
    return this.#element.nativeElement.connectedSection;
  }

  @Input()
  public set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
  }

  public get marker(): SbbNavigationMarkerElement | null {
    return this.#element.nativeElement.marker;
  }

  public get section(): SbbNavigationSectionElement | null {
    return this.#element.nativeElement.section;
  }
}
