import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';
import type { SbbSortState } from '@sbb-esta/lyne-angular/table';
import { SbbSort, SbbTableDataSource, SbbTableModule } from '@sbb-esta/lyne-angular/table';

/**
 * @title Sticky Table Example
 * @order 20
 */
@Component({
  selector: 'sbb-sticky-table-example',
  styleUrls: ['sticky-table-example.scss'],
  templateUrl: 'sticky-table-example.html',
  imports: [SbbTableModule, SbbLoadingIndicatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyTableExample {
  protected displayedColumns: string[] = [
    'line',
    'from',
    'to',
    'provider',
    'year',
    'countTrains',
    'tons',
    'timestamp',
    'recordId',
  ];
  protected dataSource = new SbbTableDataSource<TableExampleData>([]);
  protected loading = signal(true);

  private readonly sort = viewChild(SbbSort);

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    effect(() => {
      this.dataSource.sort = this.sort() ?? null;
    });

    inject(HttpClient)
      .get<{
        records: DataSetRecord[];
      }>(
        'https://data.sbb.ch/api/records/1.0/search/?dataset=zugzahlen&q=isb%3DSBB&rows=80&facet=isb&facet=strecke_bezeichnung&facet=strecke_art&facet=bp_von_abschnitt&facet=bp_bis_abschnitt&facet=jahr',
      )
      .subscribe((data) => {
        this.dataSource.data = data.records.map(
          (record: DataSetRecord) =>
            ({
              line: record.fields.strecke_bezeichnung,
              from: record.fields.bp_von_abschnitt_bezeichnung,
              to: record.fields.bp_bis_abschnitt_bezeichnung,
              provider: record.fields.isb,
              year: record.fields.jahr,
              countTrains: record.fields.anzahl_zuege,
              tons: record.fields.gesamtbelastung_bruttotonnen,
              timestamp: record.record_timestamp,
              recordId: record.recordid.substring(0, 4),
            }) satisfies TableExampleData,
        );

        this.loading.set(false);
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

interface DataSetRecord {
  fields: {
    strecke_bezeichnung: string;
    bp_von_abschnitt_bezeichnung: string;
    bp_bis_abschnitt_bezeichnung: string;
    isb: string;
    jahr: string;
    anzahl_zuege: number;
    gesamtbelastung_bruttotonnen: number;
  };
  record_timestamp: string;
  recordid: string;
}

interface TableExampleData {
  line: string;
  from: string;
  to: string;
  provider: string;
  year: string;
  countTrains: number;
  tons: number;
  timestamp: string;
  recordId: string;
}
