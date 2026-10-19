import { DatePipe } from '@angular/common';
import { afterNextRender, Component, computed, signal, viewChild } from '@angular/core';
import { SbbPearlChain, SbbPearlChainModule } from '@sbb-esta/lyne-angular/pearl-chain';

import { at } from '../pearl-chain-example-util';

/**
 * @title pearl-chain with nodes weighted by time
 * @order 5
 */
@Component({
  selector: 'sbb-pearl-chain-weighted-nodes-example',
  templateUrl: 'pearl-chain-weighted-nodes-example.html',
  styleUrl: 'pearl-chain-weighted-nodes-example.scss',
  imports: [DatePipe, SbbPearlChainModule],
})
export class PearlChainWeightedNodesExample {
  protected readonly now = at(8, 30);
  protected readonly bernDeparture = at(8, 0);
  protected readonly muensingenArrival = at(8, 12);
  protected readonly muensingenDeparture = at(8, 13);
  protected readonly thunArrival = at(8, 24);
  protected readonly thunDeparture = at(8, 26);
  protected readonly spiezArrival = at(8, 34);
  protected readonly spiezDeparture = at(8, 35);
  protected readonly interlakenArrival = at(9, 0);

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
