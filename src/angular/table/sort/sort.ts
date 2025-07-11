import type { OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  booleanAttribute,
  Directive,
  EventEmitter,
  inject,
  InjectionToken,
  Input,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import { ReplaySubject, Subject } from 'rxjs';

import type { SbbSortDirection } from './sort-direction';
import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortInvalidDirectionError,
} from './sort-errors';

/** Variable replaced at build time that indicates whether the app is in development mode. */
declare const ngDevMode: object | null;

/** Position of the arrow that displays when sorted. */
export type SbbSortHeaderArrowPosition = 'before' | 'after';

/** Interface for a directive that holds sorting state consumed by `SbbSortHeader`. */
export interface SbbSortable {
  /** The id of the column being sorted. */
  id: string;

  /** Starting sort direction. */
  start: SbbSortDirection;

  /** Whether to disable clearing the sorting state. */
  disableClear: boolean;
}

/** The current sort state. */
export interface SbbSortState {
  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SbbSortDirection;
}

/** Default options for `sbb-sort`.  */
export interface SbbSortDefaultOptions {
  /** Whether to disable clearing the sorting state. */
  disableClear?: boolean;
  /** Position of the arrow that displays when sorted. */
  arrowPosition?: SbbSortHeaderArrowPosition;
}

/** Injection token to be used to override the default options for `sbb-sort`. */
export const SBB_SORT_DEFAULT_OPTIONS = new InjectionToken<SbbSortDefaultOptions>(
  'SBB_SORT_DEFAULT_OPTIONS',
);

/** Container for SbbSortables to manage the sort state and provide default sort parameters. */
@Directive({
  selector: '[sbbSort]',
  exportAs: 'sbbSort',
  host: { class: 'sbb-sort' },
})
export class SbbSort implements OnInit, OnChanges, OnDestroy {
  #initializedStream = new ReplaySubject<void>(1);

  /** Collection of all registered sortables that this directive manages. */
  sortables: Map<string, SbbSortable> = new Map<string, SbbSortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  /** The id of the most recently sorted SbbSortable. */
  @Input('sbbSortActive') active!: string;

  /** Whether the sort is disabled. */
  @Input({ alias: 'sbbSortDisabled', transform: booleanAttribute }) disabled: boolean = false;

  /**
   * The direction to set when an SbbSortable is initially sorted.
   * May be overridden by the SbbSortable's sort start.
   */
  @Input('sbbSortStart') start: SbbSortDirection = 'asc';

  /** The sort direction of the currently active SbbSortable. */
  @Input('sbbSortDirection')
  get direction(): SbbSortDirection {
    return this.#direction;
  }
  set direction(direction: SbbSortDirection) {
    if (
      direction &&
      direction !== 'asc' &&
      direction !== 'desc' &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw getSortInvalidDirectionError(direction);
    }
    this.#direction = direction;
  }
  #direction: SbbSortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overridden by the SbbSortable's disable clear input.
   */
  @Input({ alias: 'sbbSortDisableClear', transform: booleanAttribute })
  disableClear!: boolean;

  readonly sortChange = new EventEmitter<SbbSortState>();

  /** Event emitted when the user changes either the active sort or sort direction. */
  readonly sbbSortChange = outputFromObservable<SbbSortState>(this.sortChange);

  /** Emits when the paginator is initialized. */
  initialized: Observable<void> = this.#initializedStream;

  #defaultOptions = inject(SBB_SORT_DEFAULT_OPTIONS, { optional: true });

  /**
   * Register function to be used by the contained SbbSortables. Adds the SbbSortable to the
   * collection of SbbSortables.
   */
  register(sortable: SbbSortable): void {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!sortable.id) {
        throw getSortHeaderMissingIdError();
      }

      if (this.sortables.has(sortable.id)) {
        throw getSortDuplicateSortableIdError(sortable.id);
      }
    }

    this.sortables.set(sortable.id, sortable);
  }

  /**
   * Unregister function to be used by the contained SbbSortables. Removes the SbbSortable from the
   * collection of contained SbbSortables.
   */
  deregister(sortable: SbbSortable): void {
    this.sortables.delete(sortable.id);
  }

  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable: SbbSortable): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({ active: this.active, direction: this.direction });
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: SbbSortable): SbbSortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear =
      sortable?.disableClear ?? this.disableClear ?? !!this.#defaultOptions?.disableClear;
    const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
    this.#initializedStream.next();
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
    this.#initializedStream.complete();
  }
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: SbbSortDirection, disableClear: boolean): SbbSortDirection[] {
  const sortOrder: SbbSortDirection[] = ['asc', 'desc'];
  if (start === 'desc') {
    sortOrder.reverse();
  }
  if (!disableClear) {
    sortOrder.push('');
  }

  return sortOrder;
}
