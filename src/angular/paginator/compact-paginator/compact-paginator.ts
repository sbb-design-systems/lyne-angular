import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OnInit,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbCompactPaginatorElement } from '@sbb-esta/lyne-elements/paginator/compact-paginator.js';
import { AsyncSubject, forkJoin, fromEvent, map, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/paginator/compact-paginator.js';

/**
 * It displays a paginator component in compact mode.
 */
@Directive({
  selector: 'sbb-compact-paginator',
  exportAs: 'sbbCompactPaginator',
})
export class SbbCompactPaginator implements OnInit {
  #element: ElementRef<SbbCompactPaginatorElement> = inject(ElementRef<SbbCompactPaginatorElement>);
  #ngZone: NgZone = inject(NgZone);
  #initialized = new AsyncSubject<void>();

  readonly initialized: Observable<void> = forkJoin([
    this.#element.nativeElement.updateComplete,
    this.#initialized,
  ]).pipe(map(() => undefined));

  /**
   * Total number of items.
   */
  @Input({ transform: numberAttribute })
  public set length(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.length = value));
  }
  public get length(): number {
    return this.#element.nativeElement.length;
  }

  /**
   * Number of items per page.
   */
  @Input({ transform: numberAttribute })
  public set pageSize(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSize = value));
  }
  public get pageSize(): number {
    return this.#element.nativeElement.pageSize;
  }

  /**
   * Current page index.
   */
  @Input({ transform: numberAttribute })
  public set pageIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageIndex = value));
  }
  public get pageIndex(): number {
    return this.#element.nativeElement.pageIndex;
  }

  /**
   * Position of the prev/next buttons.
   */
  @Input()
  public set pagerPosition(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pagerPosition = value));
  }
  public get pagerPosition(): 'start' | 'end' {
    return this.#element.nativeElement.pagerPosition;
  }

  /**
   * Size variant, either m or s.
   */
  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  /**
   * Accessibility label for the page. Defaults to `page`.
   * Can be set for cases like a carousel, where `slide` or `image` fits better.
   */
  @Input()
  public set accessibilityPageLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityPageLabel = value),
    );
  }
  public get accessibilityPageLabel(): string {
    return this.#element.nativeElement.accessibilityPageLabel;
  }

  /**
   * Accessibility label for the previous page. Defaults to `previous page`.
   * Can be set for cases like a carousel, where `slide` or `image` fits better.
   */
  @Input()
  public set accessibilityPreviousPageLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityPreviousPageLabel = value),
    );
  }
  public get accessibilityPreviousPageLabel(): string {
    return this.#element.nativeElement.accessibilityPreviousPageLabel;
  }

  /**
   * Accessibility label for the next page. Defaults to `next page`.
   * Can be set for cases like a carousel, where `slide` or `image` fits better.
   */
  @Input()
  public set accessibilityNextPageLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityNextPageLabel = value),
    );
  }
  public get accessibilityNextPageLabel(): string {
    return this.#element.nativeElement.accessibilityNextPageLabel;
  }

  /** Advances to the next page if it exists. */
  nextPage(): void {
    this.#element.nativeElement.nextPage();
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    this.#element.nativeElement.previousPage();
  }

  /** Move to the first page if not already there. */
  firstPage(): void {
    this.#element.nativeElement.firstPage();
  }

  /** Move to the last page if not already there. */
  lastPage(): void {
    this.#element.nativeElement.lastPage();
  }

  /** Move to a specific page index. */
  selectPage(index: number): void {
    this.#element.nativeElement.selectPage(index);
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.#element.nativeElement.hasPreviousPage();
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    return this.#element.nativeElement.hasNextPage();
  }

  /**
   * Calculates the current number of pages based on the `length` and the `pageSize`;
   * value must be rounded up (e.g. `length = 21` and `pageSize = 10` means 3 pages).
   */

  /**
   * Calculates the current number of pages based on the `length` and the `pageSize`;
   * value must be rounded up (e.g. `length = 21` and `pageSize = 10` means 3 pages).
   */
  numberOfPages(): number {
    return this.#element.nativeElement.numberOfPages();
  }

  ngOnInit(): void {
    this.#initialized.next();
    this.#initialized.complete();
  }

  protected _pageOutput: OutputRef<CustomEvent<SbbPaginatorPageEventDetails>> =
    outputFromObservable<CustomEvent<SbbPaginatorPageEventDetails>>(NEVER, {
      alias: 'page',
    });
  /**
   * The page event is dispatched when the page index, length or page size changes.
   */
  public pageOutput: OutputRef<CustomEvent<SbbPaginatorPageEventDetails>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbPaginatorPageEventDetails>>(this.#element.nativeElement, 'page'),
    );

  public page: Observable<CustomEvent<SbbPaginatorPageEventDetails>> = outputToObservable(
    this.pageOutput,
  );
}
