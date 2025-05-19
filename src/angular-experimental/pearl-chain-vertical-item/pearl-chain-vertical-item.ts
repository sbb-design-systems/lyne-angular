import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  PearlChainVerticalItemAttributes,
  SbbPearlChainVerticalItemElement,
} from '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';
import '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';

@Directive({
  selector: 'sbb-pearl-chain-vertical-item',
  exportAs: 'sbbPearlChainVerticalItem',
})
export class SbbPearlChainVerticalItem {
  #element: ElementRef<SbbPearlChainVerticalItemElement> = inject(
    ElementRef<SbbPearlChainVerticalItemElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set pearlChainVerticalItemAttributes(value: PearlChainVerticalItemAttributes) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.pearlChainVerticalItemAttributes = value),
    );
  }
  public get pearlChainVerticalItemAttributes(): PearlChainVerticalItemAttributes {
    return this.#element.nativeElement.pearlChainVerticalItemAttributes;
  }

  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }
}
