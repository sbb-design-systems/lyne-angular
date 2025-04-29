import type { AfterContentInit } from '@angular/core';
import { Component, ContentChild, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import type { SbbTableDataSource, SbbTableFilter } from '@sbb-esta/lyne-angular/table';
import { SbbSort } from '@sbb-esta/lyne-angular/table';

interface FilterType extends SbbTableFilter {
  line?: string | null;
  from?: string | null;
  to?: string | null;
}

@Component({
  standalone: true,
  selector: 'sbb-table-example',
  template: ` <ng-content /> `,
})
export class SbbTableExampleComponent implements AfterContentInit {
  @Input() datasource?: SbbTableDataSource<unknown, FilterType>;

  @ContentChild(SbbSort) sort?: SbbSort;
  @ContentChild(SbbPaginator) paginator?: SbbPaginator;
  @ContentChild(FormGroupDirective) filterForm?: FormGroupDirective;

  ngAfterContentInit() {
    if (!this.datasource) {
      return;
    }
    this.datasource!.sort = this.sort ?? null;
    this.datasource!.paginator = this.paginator ?? null;

    if (this.filterForm) {
      this.filterForm.form.valueChanges.subscribe(
        (filterValue) => (this.datasource!.filter = filterValue),
      );
    }
  }
}
