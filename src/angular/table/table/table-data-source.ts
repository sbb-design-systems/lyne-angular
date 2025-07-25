/* eslint-disable @typescript-eslint/no-explicit-any */
import { _isNumberValue } from '@angular/cdk/coercion';
import { DataSource } from '@angular/cdk/table';
import type { SbbCompactPaginator } from '@sbb-esta/lyne-angular/paginator/compact-paginator';
import type { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import type { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, merge, of as observableOf, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import type { SbbSort } from '../sort/sort';

/**
 * Interface that matches the required API parts of the SbbPaginator.
 */
export interface SbbTableDataSourcePaginator {
  page: Observable<CustomEvent<SbbPaginatorPageEventDetails> | undefined>;
  pageIndex: number;
  initialized: Observable<void>;
  pageSize: number;
  length: number;
}

/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * TableFilter can be extended to define columns (keys) to filter for in a DataSource.
 * The '_' property is used for a global filter. If an array is used, entries will be combined with the or-operator.
 */
export interface SbbTableFilter {
  /** Global filter: filtering all entries */
  _?: string | number | string[] | number[] | null;

  [key: string]: string | number | string[] | number[] | null | undefined;
}

/** Base class for SbbTableDataSource. */
export class _SbbTableDataSource<
  T,
  TFilter extends SbbTableFilter | string = string,
  P extends SbbTableDataSourcePaginator = SbbTableDataSourcePaginator,
> extends DataSource<T> {
  /** Stream that emits when a new data array is set on the data source. */
  readonly #data: BehaviorSubject<T[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  readonly #renderData = new BehaviorSubject<T[]>([]);

  /** Stream that emits when a new filter string is set on the data source. */
  readonly #filter = new BehaviorSubject<TFilter>(null!);

  /** Used to react to internal changes of the paginator that are made by the data source itself. */
  readonly #internalPageChanges = new Subject<void>();

  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription: Subscription | null = null;

  /**
   * The filtered set of data that has been matched by the filter string, or all the data if there
   * is no filter. Useful for knowing the set of data the table represents.
   * For example, a 'selectAll()' function would likely want to select the set of filtered data
   * shown to the user rather than all the data.
   */
  filteredData!: T[];

  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data(): T[] {
    return this.#data.value;
  }
  set data(data: T[]) {
    data = Array.isArray(data) ? data : [];
    this.#data.next(data);
    // Normally the `filteredData` is updated by the re-render
    // subscription, but that won't happen if it's inactive.
    if (!this._renderChangesSubscription) {
      this._filterData(data);
    }
  }

  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   */
  get filter(): TFilter {
    return this.#filter.value;
  }
  set filter(filter: TFilter) {
    this.#filter.next(filter);
    // Normally the `filteredData` is updated by the re-render
    // subscription, but that won't happen if it's inactive.
    if (!this._renderChangesSubscription) {
      this._filterData(this.data);
    }
  }

  /**
   * Instance of the SbbSort directive used by the table to control its sorting. Sort changes
   * emitted by the SbbSort will trigger an update to the table's rendered data.
   */
  get sort(): SbbSort | null {
    return this.#sort ?? null;
  }
  set sort(sort: SbbSort | null) {
    this.#sort = sort;
    this._updateChangeSubscription();
  }
  #sort?: SbbSort | null;

  /**
   * Instance of the SbbPaginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the SbbPaginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   */
  get paginator(): P | null {
    return this.#paginator ?? null;
  }
  set paginator(paginator: P | null) {
    this.#paginator = paginator;
    this._updateChangeSubscription();
  }
  #paginator?: P | null;

  /**
   * Data accessor function that is used for accessing data properties for sorting through
   * the default sortData function.
   * This default function assumes that the sort header IDs (which defaults to the column name)
   * matches the data's properties (e.g. column Xyz represents data['Xyz']).
   * May be set to a custom function for different behavior.
   * @param data Data object that is being accessed.
   * @param sortHeaderId The name of the column that represents the data.
   */
  sortingDataAccessor: (data: T, sortHeaderId: string) => string | number = (
    data: T,
    sortHeaderId: string,
  ): string | number => {
    const value = (data as unknown as Record<string, any>)[sortHeaderId];

    if (_isNumberValue(value)) {
      const numberValue = Number(value);

      // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we leave them as strings.
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
      return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
    }

    return value;
  };

  /**
   * Gets a sorted copy of the data array based on the state of the SbbSort. Called
   * after changes are made to the filtered data or when sort changes are emitted from SbbSort.
   * By default, the function retrieves the active sort and its direction and compares data
   * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
   * of data ordering.
   * @param data The array of data that should be sorted.
   * @param sort The connected SbbSort that holds the current sort state.
   */
  sortData: (data: T[], sort: SbbSort) => T[] = (data: T[], sort: SbbSort): T[] => {
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let valueA = this.sortingDataAccessor(a, active);
      let valueB = this.sortingDataAccessor(b, active);

      // If there are data in the column that can be converted to a number,
      // it must be ensured that the rest of the data
      // is of the same type so as not to order incorrectly.
      const valueAType = typeof valueA;
      const valueBType = typeof valueB;

      if (valueAType !== valueBType) {
        if (valueAType === 'number') {
          valueA += '';
        }
        if (valueBType === 'number') {
          valueB += '';
        }
      }

      // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
      // one value exists while the other doesn't. In this case, existing value should come last.
      // This avoids inconsistent results when comparing values to undefined/null.
      // If neither value exists, return 0 (equal).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (direction === 'asc' ? 1 : -1);
    });
  };

  /**
   * This method can be called by two filter types: string or an Object which extends TableFilter.
   *
   *  # String variant
   * Checks if a data object matches the data source's filter string. By default, each data object
   * is converted to a string of its properties and returns true if the filter has
   * at least one occurrence in that string.
   *
   * # TableFilter variant
   * Checks if a data object matches the data source's filter object. If several columns are defined,
   * the and-operator is applied. If a column filter is a list, the or-operator inside the list is applied.
   * The '_' property of the TableFilter can be used to search globally in all columns
   * (like the string variant above).
   *
   * By default, the filter string has its whitespace trimmed and the match is case-insensitive.
   * May be overridden for a custom implementation of filter matching.
   * @param data Data object used to check against the filter.
   * @param filter Filter string or Object which extends TableFilter that has been set on the data source.
   * @returns Whether the filter matches against the data
   */
  filterPredicate: (data: T, filter: TFilter) => boolean = (data: T, filter: TFilter): boolean => {
    const tableData = data as unknown as Record<string, any>;

    if (typeof filter === 'string') {
      return this._filterGlobally([filter.trim()], tableData);
    }

    const { _: globalFilter, ...propertyFilters } = this._normalizeTableFilter(
      filter as SbbTableFilter,
    );

    return (
      this._filterGlobally(globalFilter, tableData) &&
      this._filterProperties(propertyFilters, tableData)
    );
  };

  constructor(initialData: T[] = []) {
    super();
    this.#data = new BehaviorSubject<T[]>(initialData);
    this._updateChangeSubscription();
  }

  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with
   * the provided base data and send it to the table for rendering.
   */
  _updateChangeSubscription() {
    // Sorting and/or pagination should be watched if SbbSort and/or SbbPaginator are provided.
    // The events should emit whenever the component emits a change or initializes, or if no
    // component is provided, a stream with just a null event should be provided.
    // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
    // pipeline can progress to the next step. Note that the value from these streams are not used,
    // they purely act as a signal to progress in the pipeline.
    const sortChange = this.#sort
      ? merge(this.#sort.sortChange, this.#sort.initialized)
      : observableOf(null);
    const pageChange = this.#paginator
      ? merge(this.#paginator.page, this.#internalPageChanges, this.#paginator.initialized)
      : observableOf(null);
    const dataStream = this.#data;
    // Watch for base data or filter changes to provide a filtered set of data.
    const filteredData = combineLatest([dataStream, this.#filter]).pipe(
      map(([data]) => this._filterData(data)),
    );
    // Watch for filtered data or sort changes to provide an ordered set of data.
    const orderedData = combineLatest([filteredData, sortChange]).pipe(
      map(([data]) => this._orderData(data)),
    );
    // Watch for ordered data or page changes to provide a paged set of data.
    const paginatedData = combineLatest([orderedData, pageChange]).pipe(
      map(([data]) => this._pageData(data)),
    );
    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe((data) =>
      this.#renderData.next(data),
    );
  }

  /**
   * Returns a filtered data array where each filter object contains the filter string within
   * the result of the filterTermAccessor function. If no filter is set, returns the data array
   * as provided.
   */
  _filterData(data: T[]) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
      this.filter == null || this.filter === ''
        ? data
        : data.filter((obj) => this.filterPredicate(obj, this.filter));

    if (this.paginator) {
      this._updatePaginator(this.filteredData.length);
    }

    return this.filteredData;
  }

  /**
   * Returns a sorted copy of the data if SbbSort has a sort applied, otherwise just returns the
   * data array as provided. Uses the default data accessor for data lookup, unless a
   * sortDataAccessor function is defined.
   */
  _orderData(data: T[]): T[] {
    // If there is no active sort or direction, return the data without trying to sort.
    if (!this.sort) {
      return data;
    }

    return this.sortData(data.slice(), this.sort);
  }

  /**
   * Returns a paged slice of the provided data array according to the provided SbbPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  _pageData(data: T[]): T[] {
    if (!this.paginator) {
      return data;
    }

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  /**
   * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
   * index does not exceed the paginator's last page. Values are changed in a resolved promise to
   * guard against making property changes within a round of change detection.
   */
  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      const paginator = this.paginator;

      if (!paginator) {
        return;
      }

      paginator.length = filteredDataLength;

      // If the page index is set beyond the page, reduce it to the last page.
      if (paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
        const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);

        if (newPageIndex !== paginator.pageIndex) {
          paginator.pageIndex = newPageIndex;

          // Since the paginator only emits after user-generated changes,
          // we need our own stream so we know to should re-render the data.
          this.#internalPageChanges.next();
        }
      }
    });
  }

  /**
   * Used by the SbbTable. Called when it connects to the data source.
   * @docs-private
   */
  connect() {
    if (!this._renderChangesSubscription) {
      this._updateChangeSubscription();
    }

    return this.#renderData;
  }

  /**
   * Used by the SbbTable. Called when it disconnects from the data source.
   * @docs-private
   */
  disconnect() {
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = null;
  }

  /** Converts a TableFilter object to a key value object of strings. */
  _normalizeTableFilter(tableFilter: SbbTableFilter): Record<string, string[]> {
    const normalizedTableFilter: Record<string, string[]> = { _: [] };
    Object.keys(tableFilter).forEach((key) => {
      if (
        typeof tableFilter[key] === 'undefined' ||
        `${tableFilter[key]}`.trim() === '' ||
        tableFilter[key] === null
      ) {
        return;
      }

      if (typeof tableFilter[key] === 'string' || typeof tableFilter[key] === 'number') {
        normalizedTableFilter[key] = [`${tableFilter[key]}`.trim()];
        return;
      }

      const entry = tableFilter[key];
      if (Array.isArray(entry) && entry.length > 0) {
        normalizedTableFilter[key] = (entry as []).map((value) => `${value}`.trim());
      }
    });
    return normalizedTableFilter;
  }

  /** Filters properties against tableData and returns true if matching data was found. */
  _filterProperties(
    propertyFilters: Record<string, string[]>,
    tableData: Record<string, any>,
  ): boolean {
    return Object.keys(propertyFilters).every((key) =>
      propertyFilters[key].some(
        (value) =>
          typeof tableData[key] !== 'undefined' &&
          tableData[key] !== null &&
          this._matchesStringCaseInsensitive(`${tableData[key]}`, value),
      ),
    );
  }

  /** Filters a list of strings against tableData and returns true if matching data was found. */
  _filterGlobally(filters: string[], tableData: Record<string, any>): boolean {
    return (
      filters.length === 0 ||
      filters.some((value) =>
        this._matchesStringCaseInsensitive(this._reduceObjectToString(tableData), value),
      )
    );
  }

  /** Checks if search string is in data (case insensitive). */
  _matchesStringCaseInsensitive(data: string, search: string): boolean {
    return data.toUpperCase().indexOf(search.toUpperCase()) !== -1;
  }

  /** Reduces an object to a string. */
  _reduceObjectToString(data: object): string {
    return Object.keys(data).reduce((currentTerm: string, key: string) => {
      // Use an obscure Unicode character to delimit the words in the concatenated string.
      // This avoids matches where the values of two columns combined will match the user's query
      // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
      // that has a very low chance of being typed in by somebody in a text field. This one in
      // particular is "White up-pointing triangle with dot" from
      // https://en.wikipedia.org/wiki/List_of_Unicode_characters
      return currentTerm + (data as Record<string, any>)[key] + '◬';
    }, '');
  }
}

/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using Sort), and pagination (using Paginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
export class SbbTableDataSource<
  T,
  TFilter extends SbbTableFilter | string = string,
> extends _SbbTableDataSource<T, TFilter, SbbPaginator | SbbCompactPaginator> {}
