/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/popover/popover.js';

@Directive({
  selector: 'sbb-popover',
  standalone: true,
})
export class SbbPopoverDirective {
  #element: ElementRef<SbbPopoverElement> = inject(ElementRef<SbbPopoverElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'hide-close-button', transform: booleanAttribute })
  public set hideCloseButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideCloseButton = value));
  }
  public get hideCloseButton(): boolean {
    return this.#element.nativeElement.hideCloseButton;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'hover-trigger', transform: booleanAttribute })
  public set hoverTrigger(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hoverTrigger = value));
  }
  public get hoverTrigger(): boolean {
    return this.#element.nativeElement.hoverTrigger;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'open-delay', transform: numberAttribute })
  public set openDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.openDelay = value));
  }
  public get openDelay(): number {
    return this.#element.nativeElement.openDelay;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'close-delay', transform: numberAttribute })
  public set closeDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.closeDelay = value));
  }
  public get closeDelay(): number {
    return this.#element.nativeElement.closeDelay;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  @Output() public willOpen: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willOpen',
  );

  @Output() public didOpen: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didOpen',
  );

  @Output() public willClose: Observable<{ closeTarget: HTMLElement }> = fromEvent<{
    closeTarget: HTMLElement;
  }>(this.#element.nativeElement, 'willClose');

  @Output() public didClose: Observable<{ closeTarget: HTMLElement }> = fromEvent<{
    closeTarget: HTMLElement;
  }>(this.#element.nativeElement, 'didClose');

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(target: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }
}
