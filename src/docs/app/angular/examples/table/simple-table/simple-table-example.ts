import { Component } from '@angular/core';
import { SbbTableDataSource, SbbTableModule } from '@sbb-esta/lyne-angular/table';

/**
 * @title Simple Table
 * @order 10
 */
@Component({
  selector: 'sbb-simple-table-example',
  templateUrl: 'simple-table-example.html',
  imports: [SbbTableModule],
})
export class SimpleTableExample {
  protected displayedColumns: string[] = [
    'columnOne',
    'columnTwo',
    'columnThree',
    'columnFour',
    'columnFive',
  ];
  protected dataSource = new SbbTableDataSource(TABLE_EXAMPLE_DATA_SIMPLE);
}

interface TableExampleDataSimple {
  columnOne: string;
  columnTwo: string;
  columnThree: string;
  columnFour: string;
  columnFive: string;
}

const TABLE_EXAMPLE_DATA_SIMPLE: TableExampleDataSimple[] = [
  {
    columnOne: 'columnOne',
    columnTwo: 'columnTwo',
    columnThree: 'columnThree',
    columnFour: 'columnFour',
    columnFive: 'columnFive',
  },
  {
    columnOne: 'columnOne',
    columnTwo: 'columnTwo',
    columnThree: 'columnThree',
    columnFour: 'columnFour',
    columnFive: 'columnFive',
  },
];
