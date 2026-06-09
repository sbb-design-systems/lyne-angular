import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, effect, inject, viewChild } from '@angular/core';
import type { SbbSortState } from '@sbb-esta/lyne-angular/table';
import { SbbSort, SbbTableDataSource, SbbTableModule } from '@sbb-esta/lyne-angular/table';

/**
 * @title Sortable Table
 * @order 50
 */
@Component({
  selector: 'sbb-sortable-table-example',
  templateUrl: 'sortable-table-example.html',
  imports: [SbbTableModule, DatePipe],
})
export class SortableTableExample {
  protected displayedColumns: string[] = ['letter', 'number', 'word', 'date'];
  protected dataSource = new SbbTableDataSource(TABLE_EXAMPLE_DATA);

  private readonly sort = viewChild.required(SbbSort);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: SbbSortState) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

interface TableExampleData {
  letter: string;
  number: number;
  word: string;
  date: Date;
}

const TABLE_EXAMPLE_DATA: TableExampleData[] = [
  {
    letter: 'A',
    number: 5,
    word: 'abc',
    date: new Date(1097777640),
  },
  {
    letter: 'B',
    number: 4,
    word: 'def',
    date: new Date(939924840),
  },
  {
    letter: 'C',
    number: 3,
    word: 'ghj',
    date: new Date(782158440),
  },
  {
    letter: 'D',
    number: 2,
    word: 'klm',
    date: new Date(1413310440),
  },
  {
    letter: 'E',
    number: 1,
    word: 'nop',
    date: new Date(1255544040),
  },
];
