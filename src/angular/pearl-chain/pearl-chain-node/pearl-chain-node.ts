import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import {
  SbbPearlChainNodeElement,
  type SbbPearlChainNodeType,
} from '@sbb-esta/lyne-elements/pearl-chain.pure.js';
/**
 * Represents a station/point of interest within a `sbb-pearl-chain`.
 */
@Directive({
  selector: 'sbb-pearl-chain-node',
  exportAs: 'sbbPearlChainNode',
})
export class SbbPearlChainNode {
  static {
    SbbPearlChainNodeElement.define();
  }

  #element: ElementRef<SbbPearlChainNodeElement> = inject(ElementRef<SbbPearlChainNodeElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Decides how the bullet is rendered. Defaults to _empty_ (no bullet).
   */
  @Input()
  public set type(value: SbbPearlChainNodeType | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbPearlChainNodeType | null {
    return this.#element.nativeElement.type;
  }

  /**
   * Marks the node as disrupted, coloring the bullet red (if rendered).
   */
  @Input()
  public set disrupted(value: 'arrival' | 'departure' | true | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disrupted = value));
  }
  public get disrupted(): 'arrival' | 'departure' | true | null {
    return this.#element.nativeElement.disrupted;
  }

  /**
   * Marks the node as a walk connection. Does not affect the bullet color.
   */
  @Input()
  public set walk(value: 'arrival' | 'departure' | true | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.walk = value));
  }
  public get walk(): 'arrival' | 'departure' | true | null {
    return this.#element.nativeElement.walk;
  }

  /**
   * Marks the connection as unsure, rendering the line dashed. Does not affect the bullet.
   */
  @Input()
  public set unsure(value: 'arrival' | 'departure' | true | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.unsure = value));
  }
  public get unsure(): 'arrival' | 'departure' | true | null {
    return this.#element.nativeElement.unsure;
  }

  /**
   * Marks the node as irrelevant, coloring the bullet gray (if rendered); supersedes `disrupted`.
   */
  @Input()
  public set irrelevant(value: 'arrival' | 'departure' | true | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.irrelevant = value));
  }
  public get irrelevant(): 'arrival' | 'departure' | true | null {
    return this.#element.nativeElement.irrelevant;
  }

  /**
   * The arrival date/time at this node. Accepts ISO 8601 datetime strings.
   */
  @Input()
  public set arrival(value: Date | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.arrival = value));
  }
  public get arrival(): Date | null {
    return this.#element.nativeElement.arrival;
  }

  /**
   * The departure date/time at this node. Accepts ISO 8601 datetime strings.
   */
  @Input()
  public set departure(value: Date | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.departure = value));
  }
  public get departure(): Date | null {
    return this.#element.nativeElement.departure;
  }
}
