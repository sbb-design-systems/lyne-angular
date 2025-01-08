/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbIconPlacement } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbBlockLinkStaticElement } from '@sbb-esta/lyne-elements/link/block-link-static.js';
import { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import '@sbb-esta/lyne-elements/link/block-link-static.js';

@Directive({
  selector: 'sbb-block-link-static',
  standalone: true,
})
export class SbbBlockLinkStaticDirective {
  #element: ElementRef<SbbBlockLinkStaticElement> = inject(ElementRef<SbbBlockLinkStaticElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-placement' })
  public set iconPlacement(value: SbbIconPlacement) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconPlacement = value));
  }
  public get iconPlacement(): SbbIconPlacement {
    return this.#element.nativeElement.iconPlacement;
  }

  @Input()
  public set size(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbLinkSize {
    return this.#element.nativeElement.size;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
