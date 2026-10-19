import { DatePipe } from '@angular/common';
import { afterNextRender, Component, computed, signal, viewChild } from '@angular/core';
import { SbbJourneyHeaderModule } from '@sbb-esta/lyne-angular/journey-header';
import { SbbPearlChain, SbbPearlChainModule } from '@sbb-esta/lyne-angular/pearl-chain';
import type { SbbPearlChainNodeType } from '@sbb-esta/lyne-elements/pearl-chain.pure.js';

import { at } from '../pearl-chain-example-util';

/**
 * @title pearl-chain with nodes weighted by time
 * @order 5
 */
@Component({
  selector: 'sbb-pearl-chain-weighted-nodes-example',
  templateUrl: 'pearl-chain-weighted-nodes-example.html',
  styleUrl: 'pearl-chain-weighted-nodes-example.scss',
  imports: [DatePipe, SbbPearlChainModule, SbbJourneyHeaderModule],
})
export class PearlChainWeightedNodesExample {
  protected readonly now = at(8, 30);
  protected readonly stops: {
    type: SbbPearlChainNodeType;
    arrival?: Date;
    departure?: Date;
  }[] = [
    { type: 'start', departure: at(8, 0) },
    { type: 'stop', arrival: at(8, 12), departure: at(8, 13) },
    { type: 'stop', arrival: at(8, 22), departure: at(8, 23) },
    { type: 'end', arrival: at(9, 0) },
  ];
  protected readonly departure = this.stops[0].departure!;
  protected readonly arrival = this.stops[this.stops.length - 1].arrival!;

  private readonly pearlChain = viewChild.required(SbbPearlChain);
  private readonly weights = signal<number[]>([]);

  // Distance between each node and the following one, as a fraction of the whole journey.
  protected readonly gaps = computed(() => {
    const weights = this.weights();
    return weights.slice(1).map((weight, index) => weight - weights[index]);
  });

  constructor() {
    // The nodes register themselves with the pearl chain once rendered.
    afterNextRender(() => this.weights.set(this.pearlChain().calculateNodeWeights()));
  }
}
