/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  PearlChainVerticalItemAttributes,
  SbbPearlChainVerticalItemElement,
} from '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';
import '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';

@Directive({
  selector: 'sbb-pearl-chain-vertical-item',
  standalone: true,
})
export class SbbPearlChainVerticalItem {
  #element: ElementRef<SbbPearlChainVerticalItemElement> = inject(
    ElementRef<SbbPearlChainVerticalItemElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'pearl-chain-vertical-item-attributes' })
  public set pearlChainVerticalItemAttributes(value: PearlChainVerticalItemAttributes) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.pearlChainVerticalItemAttributes = value),
    );
  }
  public get pearlChainVerticalItemAttributes(): PearlChainVerticalItemAttributes {
    return this.#element.nativeElement.pearlChainVerticalItemAttributes;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'disable-animation', transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }
}
