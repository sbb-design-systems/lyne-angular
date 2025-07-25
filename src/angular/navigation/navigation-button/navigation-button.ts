import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbNavigationButtonElement } from '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import type { SbbNavigationActionSize } from '@sbb-esta/lyne-elements/navigation.js';

import '@sbb-esta/lyne-elements/navigation/navigation-button.js';

@Directive({
  selector: 'sbb-navigation-button',
  exportAs: 'sbbNavigationButton',
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
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
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

  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }

  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }
}
