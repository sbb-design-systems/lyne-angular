import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SbbPearlChainModule } from '@sbb-esta/lyne-angular/pearl-chain';
import { SbbTimetableOccupancyModule } from '@sbb-esta/lyne-angular/timetable-occupancy';

const at = (h: number, m: number): Date => {
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
};

/**
 * @title Full vertical pearl-chain
 * @order 4
 */
@Component({
  selector: 'sbb-pearl-chain-full-vertical-example',
  templateUrl: 'pearl-chain-full-vertical-example.html',
  styleUrl: 'pearl-chain-full-vertical-example.scss',
  imports: [DatePipe, SbbPearlChainModule, SbbTimetableOccupancyModule],
})
export class PearlChainFullVerticalExample {
  protected readonly now = at(8, 15);
  protected readonly bernDeparture = at(8, 0);
  protected readonly muensingenArrival = at(8, 8);
  protected readonly muensingenDeparture = at(8, 12);
  protected readonly thunArrival = at(8, 18);
  protected readonly thunDeparture = at(8, 22);
  protected readonly spiezArrival = at(8, 29);
  protected readonly spiezDeparture = at(8, 34);
  protected readonly interlakenArrival = at(8, 50);
}
