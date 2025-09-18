import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import { SbbTableDataSource, SbbTableModule, SbbTableWrapper } from '@sbb-esta/lyne-angular/table';
import type { Args, Meta } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

import readme from './readme.md';
import { SbbTableExampleComponent } from './table-example.component';

const DATA_SAMPLE = [
  {
    line: 'Lausanne - Fribourg - Bern Steigerhubel',
    from: 'Schmitten',
    to: 'Wünnewil',
    provider: 'SBB',
    timestamp: '2024-03-08T14:23:54.78Z',
  },
  {
    line: 'Lausanne - Fribourg - Bern Steigerhubel',
    from: 'Thörishaus Station',
    to: 'Oberwangen',
    provider: 'SBB',
    timestamp: '2024-03-08T14:23:54.78Z',
  },
  {
    line: 'Lausanne - Fribourg - Bern Steigerhubel',
    from: 'Villars-sur-Glâne',
    to: 'Fribourg/Freiburg',
    provider: 'SBB',
    timestamp: '2024-03-08T14:23:54.78Z',
  },
  {
    line: 'Löchligut/Solothurn - NBS/ABS - Olten',
    from: 'Derendingen',
    to: 'Fribourg/Freiburg',
    provider: 'SBB',
    timestamp: '2024-03-08T14:23:54.78Z',
  },
];
const LONG_DATA_SAMPLE = [
  ...DATA_SAMPLE,
  ...DATA_SAMPLE,
  ...DATA_SAMPLE,
  ...DATA_SAMPLE,
  ...DATA_SAMPLE,
];

const shortDatasource = new SbbTableDataSource(DATA_SAMPLE);
const longDatasource = new SbbTableDataSource(LONG_DATA_SAMPLE);

const size: InputType = {
  table: { category: 'inputs' },
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
};

const negative: InputType = { control: { type: 'boolean' } };

const datasource: InputType = {
  control: false,
  table: { disable: true },
  options: ['short'],
  mapping: {
    short: shortDatasource,
    long: longDatasource,
  },
};

const columnsOptions = [
  ['line', 'from', 'to', 'timestamp', 'provider'],
  ['line', 'from', 'to'],
];
const columns: InputType = {
  options: Object.keys(columnsOptions),
  mapping: columnsOptions,
  control: {
    type: 'select',
    labels: {
      0: columnsOptions[0].join(', '),
      1: columnsOptions[1].join(', '),
    },
  },
};

const argTypes: ArgTypes = {
  size,
  negative,
  datasource,
  columns,
};

const args: Args = {
  size: 'm',
  negative: false,
  datasource: 'short',
  columns: columns.options![0],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultTemplate = ({ columns, datasource, size, negative }: Args) => `
  <sbb-table-wrapper [negative]=${negative}>
    <table sbb-table [dataSource]=datasource
      aria-label="Train lines 2024"
      class="sbb-table sbb-table-${size} ${negative ? 'sbb-table--negative' : ''}"
    >
      <sbb-text-column name="line"></sbb-text-column>
      <sbb-text-column name="from"></sbb-text-column>
      <sbb-text-column name="to"></sbb-text-column>
      <sbb-text-column name="provider"></sbb-text-column>

      <ng-container sbbColumnDef="timestamp">
        <th sbb-header-cell *sbbHeaderCellDef> Timestamp </th>
        <td sbb-cell *sbbCellDef="let row"> {{row.timestamp | date:'long'}} </td>
      </ng-container>

      <tr sbb-header-row *sbbHeaderRowDef="columns"></tr>
      <tr sbb-row *sbbRowDef="let row; columns: columns"></tr>
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withSortTemplate = ({ columns, datasource, size, negative }: Args) => `
  <sbb-table-wrapper [negative]=${negative}>
    <table sbb-table [dataSource]=datasource
      aria-label="Train lines 2024"
      class="sbb-table sbb-table-${size} ${negative ? 'sbb-table--negative' : ''}"
      sbbSort
      sbbSortActive="from"
      sbbSortDirection="desc"
    >
      <ng-container sbbColumnDef="line">
        <th
          sbb-header-cell
          sbb-sort-header="line"
          *sbbHeaderCellDef
          sortActionDescription="Sort by Line"
        >
          Line
        </th>
        <td sbb-cell *sbbCellDef="let element">{{ element.line }}</td>
      </ng-container>

      <ng-container sbbColumnDef="from">
        <th
          sbb-header-cell
          sbb-sort-header="from"
          *sbbHeaderCellDef
          sortActionDescription="Sort by From"
        >
          From
        </th>
        <td sbb-cell *sbbCellDef="let element">{{ element.from }}</td>
      </ng-container>

      <sbb-text-column name="to"></sbb-text-column>
      <sbb-text-column name="provider"></sbb-text-column>

      <ng-container sbbColumnDef="timestamp">
        <th sbb-header-cell *sbbHeaderCellDef sbb-sort-header="timestamp"> Timestamp </th>
        <td sbb-cell *sbbCellDef="let row"> {{row.timestamp | date:'long'}} </td>
      </ng-container>

      <tr sbb-header-row *sbbHeaderRowDef="columns"></tr>
      <tr sbb-row *sbbRowDef="let row; columns: columns"></tr>
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withPaginatorTemplate = ({ columns, datasource, size, negative }: Args) => `
  <sbb-table-wrapper [negative]=${negative}>
    <table sbb-table [dataSource]=datasource
      aria-label="Train lines 2024"
      class="sbb-table sbb-table-${size} ${negative ? 'sbb-table--negative' : ''}"
    >
      <sbb-text-column name="line"></sbb-text-column>
      <sbb-text-column name="from"></sbb-text-column>
      <sbb-text-column name="to"></sbb-text-column>
      <sbb-text-column name="provider"></sbb-text-column>

      <ng-container sbbColumnDef="timestamp">
        <th sbb-header-cell *sbbHeaderCellDef> Timestamp </th>
        <td sbb-cell *sbbCellDef="let row"> {{row.timestamp | date:'long'}} </td>
      </ng-container>

      <tr sbb-header-row *sbbHeaderRowDef="columns"></tr>
      <tr sbb-row *sbbRowDef="let row; columns: columns"></tr>
    </table>
  </sbb-table-wrapper>
  <div style="padding-block-start: var(--sbb-spacing-fixed-2x)">
    <sbb-paginator [length]=datasource.data.length [pageSize]=5 [pageSizeOptions]="[5,10,20]"></sbb-paginator>
  </div>
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withFilterTemplate = ({ columns, datasource, size, negative }: Args) => `
  <sbb-form-field size="s" [negative]=${negative} style="margin-block-end: var(--sbb-spacing-fixed-2x)">
    <label>Global filtering</label>
    <input formControlName="_">
  </sbb-form-field>
  <sbb-table-wrapper [negative]=${negative}>
    <table sbb-table [dataSource]=datasource
      aria-label="Train lines 2024"
      class="sbb-table sbb-table-${size} ${negative ? 'sbb-table--negative' : ''}"
    >
      <sbb-text-column name="line"></sbb-text-column>
      <sbb-text-column name="from"></sbb-text-column>
      <sbb-text-column name="to"></sbb-text-column>
      <sbb-text-column name="provider"></sbb-text-column>
      <ng-container sbbColumnDef="timestamp">
        <th sbb-header-cell *sbbHeaderCellDef> Timestamp </th>
        <td sbb-cell *sbbCellDef="let row"> {{row.timestamp | date:'long'}} </td>
      </ng-container>

      <ng-container sbbColumnDef="filter-line">
        <th sbb-header-cell *sbbHeaderCellDef class="sbb-table-filter">
          <sbb-form-field size="s" [negative]=${negative}>
            <input formControlName="line" />
          </sbb-form-field>
        </th>
      </ng-container>
      <ng-container sbbColumnDef="filter-from">
        <th sbb-header-cell *sbbHeaderCellDef class="sbb-table-filter">
          <sbb-form-field size="s" [negative]=${negative}>
            <input formControlName="from" />
          </sbb-form-field>
        </th>
      </ng-container>
      <ng-container sbbColumnDef="filter-to">
        <th sbb-header-cell *sbbHeaderCellDef class="sbb-table-filter">
          <sbb-form-field size="s" [negative]=${negative}>
            <input formControlName="to" />
          </sbb-form-field>
        </th>
      </ng-container>
      <ng-container sbbColumnDef="empty">
        <th sbb-header-cell *sbbHeaderCellDef></th>
      </ng-container>

      <tr sbb-header-row *sbbHeaderRowDef="columns"></tr>
      <tr sbb-header-row *sbbHeaderRowDef="['filter-line', 'filter-from', 'filter-to', 'empty', 'empty']"></tr>
      <tr sbb-row *sbbRowDef="let row; columns: columns"></tr>
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withStickyColumnsTemplate = ({ columns, datasource, size, negative }: Args) => `
  <sbb-table-wrapper [negative]=${negative} style="height: 80vh">
    <table sbb-table [dataSource]=datasource
      aria-label="Train lines 2024"
      class="sbb-table sbb-table-${size} ${negative ? 'sbb-table--negative' : ''}"
      style="width: 150%;"
    >
      <sbb-text-column name="line" sticky></sbb-text-column>
      <sbb-text-column name="from"></sbb-text-column>
      <sbb-text-column name="to"></sbb-text-column>
      <sbb-text-column name="provider" stickyEnd></sbb-text-column>

      <ng-container sbbColumnDef="timestamp">
        <th sbb-header-cell *sbbHeaderCellDef> Timestamp </th>
        <td sbb-cell *sbbCellDef="let row"> {{row.timestamp | date:'long'}} </td>
      </ng-container>

      <tr sbb-header-row *sbbHeaderRowDef="columns; sticky: true"></tr>
      <tr sbb-row *sbbRowDef="let row; columns: columns"></tr>
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbTableModule,
        ReactiveFormsModule,
        SbbTableExampleComponent,
        SbbPaginator,
        SbbFormField,
      ],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  title: 'elements/sbb-table/sbb-table-wrapper',
  component: SbbTableWrapper,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes,
  args,
};
export default meta;

export const Default = {
  render: (args: Args) => ({
    props: args,
    template: `<sbb-table-example [datasource]="datasource">
      ${defaultTemplate(args)}
    </sbb-table-example>`,
  }),
};

export const WithSort = {
  render: (args: Args) => ({
    props: args,
    template: `<sbb-table-example [datasource]="datasource">
      ${withSortTemplate(args)}
    </sbb-table-example>`,
  }),
};

export const WithPaginator = {
  args: { datasource: 'long' },
  render: (args: Args) => ({
    props: args,
    template: `<sbb-table-example [datasource]="datasource">
      ${withPaginatorTemplate(args)}
    </sbb-table-example>`,
  }),
};

const filterForm = new FormGroup({
  _: new FormControl(''),
  line: new FormControl(''),
  from: new FormControl(''),
  to: new FormControl(''),
});

export const WithFiltering = {
  argTypes: {
    // workaround to access 'filterForm' from the template
    filterForm: { type: 'object', control: false, table: { disable: true } },
  },
  args: {
    filterForm: filterForm,
    size: 's',
  },
  render: ({ filterForm, ...args }: Args) => ({
    props: { filterForm, ...args },
    template: `<sbb-table-example [datasource]="datasource">
      <div [formGroup]="filterForm">
        ${withFilterTemplate(args)}
      </div>
    </sbb-table-example>`,
  }),
};

export const Sticky = {
  args: { datasource: 'long' },
  render: (args: Args) => ({
    props: args,
    template: `<sbb-table-example [datasource]="datasource">
      ${withStickyColumnsTemplate(args)}
    </sbb-table-example>`,
  }),
};
