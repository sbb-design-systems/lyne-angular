/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbTeaserElement } from '@sbb-esta/lyne-elements/teaser.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/teaser.js';

@Directive({
  selector: 'sbb-teaser',
  standalone: true,
})
export class SbbTeaserDirective {
  #element: ElementRef<SbbTeaserElement> = inject(ElementRef<SbbTeaserElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set alignment(value: 'after-centered' | 'after' | 'below') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignment = value));
  }
  public get alignment(): 'after-centered' | 'after' | 'below' {
    return this.#element.nativeElement.alignment;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'chip-content' })
  public set chipContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.chipContent = value));
  }
  public get chipContent(): string {
    return this.#element.nativeElement.chipContent;
  }

  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  @Input()
  public set target(value: LinkTargetType | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): LinkTargetType | string {
    return this.#element.nativeElement.target;
  }

  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  @Input({ transform: booleanAttribute })
  public set download(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): boolean {
    return this.#element.nativeElement.download;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }
}
