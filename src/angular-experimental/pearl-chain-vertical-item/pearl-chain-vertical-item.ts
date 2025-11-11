import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  PearlChainVerticalItemAttributes,
  SbbPearlChainVerticalItemElement,
} from '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';

import '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';

/**
 * It displays details about connection between stations.
 *
 * @slot left - Content of the left side of the item
 * @slot right - Content of the right side of the item
 */
@Directive({
  selector: 'sbb-pearl-chain-vertical-item',
  exportAs: 'sbbPearlChainVerticalItem',
})
export class SbbPearlChainVerticalItem {
  #element: ElementRef<SbbPearlChainVerticalItemElement> = inject(
    ElementRef<SbbPearlChainVerticalItemElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * The pearlChainVerticalItemAttributes Prop for styling the bullets and line.
   */
  @Input()
  public set pearlChainVerticalItemAttributes(value: PearlChainVerticalItemAttributes) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.pearlChainVerticalItemAttributes = value),
    );
  }
  public get pearlChainVerticalItemAttributes(): PearlChainVerticalItemAttributes {
    return this.#element.nativeElement.pearlChainVerticalItemAttributes;
  }

  /**
   * If true, the position won't be animated.
   */
  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }
}
