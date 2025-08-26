import { SbbSort } from './sort/sort';
import { SbbSortHeader } from './sort/sort-header';
import {
  SbbCell,
  SbbCellDef,
  SbbColumnDef,
  SbbFooterCell,
  SbbFooterCellDef,
  SbbHeaderCell,
  SbbHeaderCellDef,
} from './table/cell';
import {
  SbbFooterRow,
  SbbFooterRowDef,
  SbbHeaderRow,
  SbbHeaderRowDef,
  SbbRow,
  SbbRowDef,
} from './table/row';
import { SbbRecycleRows, SbbTable } from './table/table';
import { SbbTextColumn } from './table/text-column';
import { SbbTableWrapper } from './table-wrapper/table-wrapper';

export const SbbTableModule = [
  // Table
  SbbTable,
  SbbRecycleRows,
  SbbTableWrapper,

  // Template defs
  SbbHeaderCellDef,
  SbbHeaderRowDef,
  SbbColumnDef,
  SbbCellDef,
  SbbRowDef,
  SbbFooterCellDef,
  SbbFooterRowDef,

  // Cell directives
  SbbHeaderCell,
  SbbCell,
  SbbFooterCell,

  // Row directives
  SbbHeaderRow,
  SbbRow,
  SbbFooterRow,

  SbbTextColumn,

  // Sort
  SbbSort,
  SbbSortHeader,
] as const;
