import type { BooleanInput } from '@angular/cdk/coercion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTextColumn } from '@angular/cdk/table';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { SbbCell, SbbCellDef, SbbColumnDef, SbbHeaderCell, SbbHeaderCellDef } from './cell';

/**
 * Column that simply shows text content for the header and row cells. Assumes that the table
 * is using the native table implementation (`<table>`).
 *
 * By default, the name of this column will be the header text and data property accessor.
 * The header text can be overridden with the `headerText` input. Cell values can be overridden with
 * the `dataAccessor` input. Change the text justification to the start or end using the `justify`
 * input.
 */
@Component({
  selector: 'sbb-text-column',
  template: `
    <ng-container sbbColumnDef [sticky]="sticky" [stickyEnd]="stickyEnd">
      <th sbb-header-cell *sbbHeaderCellDef [style.text-align]="justify">
        {{ headerText }}
      </th>
      <td sbb-cell *sbbCellDef="let data" [style.text-align]="justify">
        {{ dataAccessor(data, name) }}
      </td>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  // Change detection is intentionally not set to OnPush. This component's template will be provided
  // to the table to be inserted into its view. This is problematic when change detection runs since
  // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
  // mean's the template in the table's view will not have the updated value (and in fact will cause
  // an ExpressionChangedAfterItHasBeenCheckedError).
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [SbbColumnDef, SbbHeaderCellDef, SbbHeaderCell, SbbCellDef, SbbCell],
})
export class SbbTextColumn<T> extends CdkTextColumn<T> implements OnInit {
  /**
   * Group this column with the next column.
   * If set to true, the border to the next cell is hidden.
   */
  @Input()
  get groupWithNext(): boolean {
    return this.#groupWithNext;
  }
  set groupWithNext(value: BooleanInput) {
    this.#groupWithNext = coerceBooleanProperty(value);

    // With Ivy, inputs can be initialized before static query results are
    // available. In that case, we defer the synchronization until "ngOnInit" fires.
    this.#syncColumnDefGroupWithNext();
  }
  #groupWithNext: boolean = false;

  @Input()
  sticky: boolean = false;

  @Input()
  stickyEnd: boolean = false;

  override ngOnInit() {
    super.ngOnInit();
    this.#syncColumnDefGroupWithNext();
  }

  /** Synchronizes the column definition groupWithNext with the text column groupWithNext. */
  #syncColumnDefGroupWithNext() {
    if (this.columnDef) {
      (this.columnDef as SbbColumnDef).groupWithNext = this.#groupWithNext;
    }
  }
}
