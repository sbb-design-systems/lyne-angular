import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbHorizontalFrom } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbHeaderButtonElement } from '@sbb-esta/lyne-elements/header/header-button.js';
import '@sbb-esta/lyne-elements/header/header-button.js';

@Directive({
  selector: 'sbb-header-button',
})
export class SbbHeaderButton {
  #element: ElementRef<SbbHeaderButtonElement> = inject(ElementRef<SbbHeaderButtonElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ alias: 'expand-from' })
  public set expandFrom(value: SbbHorizontalFrom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expandFrom = value));
  }
  public get expandFrom(): SbbHorizontalFrom {
    return this.#element.nativeElement.expandFrom;
  }

  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
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
}
