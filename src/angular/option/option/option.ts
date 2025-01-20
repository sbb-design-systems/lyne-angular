import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/option/option.js';

@Directive({
  selector: 'sbb-option',
  standalone: true,
})
export class SbbOption {
  #element: ElementRef<SbbOptionElement> = inject(ElementRef<SbbOptionElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  @Output() public optionSelectionChange: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'optionSelectionChange',
  );

  @Output() public optionSelected: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'optionSelected',
  );
}
