import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { Breakpoint } from '@sbb-esta/lyne-elements/core/dom.js';
import type { SbbDialogTitleElement } from '@sbb-esta/lyne-elements/dialog/dialog-title.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/dialog/dialog-title.js';

@Directive({
  selector: 'sbb-dialog-title',
})
export class SbbDialogTitle {
  #element: ElementRef<SbbDialogTitleElement> = inject(ElementRef<SbbDialogTitleElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ alias: 'back-button', transform: booleanAttribute })
  public set backButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backButton = value));
  }
  public get backButton(): boolean {
    return this.#element.nativeElement.backButton;
  }

  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  @Input({ alias: 'accessibility-back-label' })
  public set accessibilityBackLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityBackLabel = value),
    );
  }
  public get accessibilityBackLabel(): string {
    return this.#element.nativeElement.accessibilityBackLabel;
  }

  @Input({ alias: 'hide-on-scroll' })
  public set hideOnScroll(value: Breakpoint | boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideOnScroll = value));
  }
  public get hideOnScroll(): Breakpoint | boolean {
    return this.#element.nativeElement.hideOnScroll;
  }

  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  @Input({ alias: 'visual-level' })
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input({ alias: 'visually-hidden', transform: booleanAttribute })
  public set visuallyHidden(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visuallyHidden = value));
  }
  public get visuallyHidden(): boolean {
    return this.#element.nativeElement.visuallyHidden;
  }

  @Output() public requestBackAction: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'requestBackAction',
  );
}
