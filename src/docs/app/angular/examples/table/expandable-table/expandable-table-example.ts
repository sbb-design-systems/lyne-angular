import { Component, signal } from '@angular/core';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTableModule } from '@sbb-esta/lyne-angular/table';

/**
 * @title Expandable table
 * @order 120
 */
@Component({
  selector: 'sbb-expandable-table-example',
  templateUrl: 'expandable-table-example.html',
  styleUrls: ['expandable-table-example.scss'],
  imports: [SbbTableModule, SbbIconModule],
})
export class ExpandableTableExample {
  protected displayedColumns: string[] = ['connection', 'time', 'duration'];
  protected dataSource = TABLE_EXAMPLE_DATA;
  protected selectedId = signal<number | null>(null);
  protected isExpansionDetailRow = (_i: number, row: object) => 'details' in row;

  protected rowClicked(row: (typeof TABLE_EXAMPLE_DATA)[number]) {
    if (this.selectedId() === row.id) {
      this.selectedId.set(null);
    } else {
      this.selectedId.set(row.id);
    }
  }
}

const TABLE_EXAMPLE_DATA = [
  {
    id: 1,
    connection: 'ICE Direction Berlin Ostbahnhof',
    time: '11:04 - 11:30',
    duration: '26 min',
    details: 'Bern, Gleis 6; Olten, Gleis 7',
  },
  {
    id: 2,
    connection: 'IR 17 Direction Olten',
    time: '11:07 - 11:54',
    duration: '47 min',
    details: 'Bern, Gleis 10; Olten, Gleis 10',
  },
  {
    id: 3,
    connection: 'IR 16 Direction Zürich HB',
    time: '11:33 - 12:00',
    duration: '27 min',
    details: 'Bern, Gleis 12; Olten, Gleis 4',
  },
  {
    id: 4,
    connection: 'IC 61 Direction Basel SBB',
    time: '11:36 - 12:03',
    duration: '27 min',
    details: 'Bern, Gleis 4; Olten, Gleis 7',
  },
  {
    id: 5,
    connection: 'IR 35 Direction Chur',
    time: '11:38 - 12:24',
    duration: '46 min',
    details: 'Bern, Gleis 4; Olten, Gleis 7',
  },
];
