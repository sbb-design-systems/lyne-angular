import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  Output,
} from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbCompactPaginatorElement } from '@sbb-esta/lyne-elements/paginator/compact-paginator.js';
import { from, fromEvent, map, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/paginator/compact-paginator.js';

@Directive({
  selector: 'sbb-compact-paginator',
})
export class SbbCompactPaginator {
  #element: ElementRef<SbbCompactPaginatorElement> = inject(ElementRef<SbbCompactPaginatorElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: numberAttribute })
  public set length(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.length = value));
  }
  public get length(): number {
    return this.#element.nativeElement.length;
  }

  @Input({ transform: numberAttribute })
  public set pageSize(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSize = value));
  }
  public get pageSize(): number {
    return this.#element.nativeElement.pageSize;
  }

  @Input({ transform: numberAttribute })
  public set pageIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageIndex = value));
  }
  public get pageIndex(): number {
    return this.#element.nativeElement.pageIndex;
  }

  @Input()
  public set pagerPosition(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pagerPosition = value));
  }
  public get pagerPosition(): 'start' | 'end' {
    return this.#element.nativeElement.pagerPosition;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Output('page') protected _page: (typeof this)['page'] = NEVER;
  public page: Observable<CustomEvent<SbbPaginatorPageEventDetails>> = fromEvent<
    CustomEvent<SbbPaginatorPageEventDetails>
  >(this.#element.nativeElement, 'page');

  readonly initialized: Observable<void> = from(this.#element.nativeElement.updateComplete).pipe(
    map(() => undefined),
  );

  /** Advances to the next page if it exists. */
  nextPage(): void {
    this.pageIndex = this.pageIndex + 1;
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    this.pageIndex = this.pageIndex - 1;
  }

  /** Move to the first page if not already there. */
  firstPage(): void {
    this.pageIndex = 0;
  }

  /** Move to the last page if not already there. */
  lastPage(): void {
    this.pageIndex = this.numberOfPages() - 1;
  }

  /** Move to a specific page index. */
  selectPage(index: number): void {
    this.pageIndex = index;
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize !== 0;
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const maxPageIndex = this.numberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize !== 0;
  }

  /** Calculate the number of pages */
  numberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }
}
