import { Directive, ElementRef, Input, NgZone, inject, contentChildren } from '@angular/core';
import { SbbPearlChainElement } from '@sbb-esta/lyne-elements/pearl-chain.pure.js';

import { SbbPearlChainNode } from '../pearl-chain-node';

/**
 * It displays a chain of `sbb-pearl-chain-node` elements connected by lines,
 * representing a journey with its stops.
 */
@Directive({
  selector: 'sbb-pearl-chain',
  exportAs: 'sbbPearlChain',
})
export class SbbPearlChain {
  static {
    SbbPearlChainElement.define();
  }

  #element: ElementRef<SbbPearlChainElement> = inject(ElementRef<SbbPearlChainElement>);
  #ngZone: NgZone = inject(NgZone);
  private _nodes = contentChildren(SbbPearlChainNode, { descendants: true });

  /**
   * A configured date which acts as the current date instead of the real current date.
   * Only recommended for testing purposes.
   */
  @Input()
  public set now(value: Date | string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date {
    return this.#element.nativeElement.now;
  }

  /**
   * Returns the registered `sbb-pearl-chain-node` elements, in DOM order.
   */
  public get nodes(): readonly SbbPearlChainNode[] {
    return this._nodes();
  }
  /**
   * Returns the relative position (0 for the first node, 1 for the last one) of each node,
   * in DOM order, proportional to its `departure` time (or `arrival` if there is no `departure`).
   */
  public calculateNodeWeights(): number[] {
    return this.#element.nativeElement.calculateNodeWeights();
  }
}
