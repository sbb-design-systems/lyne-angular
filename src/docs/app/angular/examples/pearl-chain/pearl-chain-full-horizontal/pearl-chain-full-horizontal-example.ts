import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbPearlChainModule } from '@sbb-esta/lyne-angular/pearl-chain';

import { at } from '../pearl-chain-example-util';

/**
 * @title Full horizontal pearl-chain
 * @order 3
 */
@Component({
  selector: 'sbb-pearl-chain-full-horizontal-example',
  templateUrl: 'pearl-chain-full-horizontal-example.html',
  styleUrl: 'pearl-chain-full-horizontal-example.scss',
  imports: [DatePipe, SbbIconModule, SbbPearlChainModule],
})
export class PearlChainFullHorizontalExample {
  protected readonly now = at(8, 10);
  protected readonly bernDeparture = at(8, 0);
  protected readonly thunArrival = at(8, 22);
  protected readonly thunDeparture = at(8, 24);
  protected readonly interlakenArrival = at(8, 50);
}
