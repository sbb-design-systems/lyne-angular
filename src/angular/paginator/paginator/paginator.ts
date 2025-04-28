import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OnInit,
  Output,
} from '@angular/core';
import type { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbPaginatorElement } from '@sbb-esta/lyne-elements/paginator/paginator.js';
import { AsyncSubject, forkJoin, fromEvent, map, NEVER, type Observable } from 'rxjs';

import { booleanAttribute } from '../../core';

import '@sbb-esta/lyne-elements/paginator/paginator.js';

@Directive({
  selector: 'sbb-paginator',
})
export class SbbPaginator implements OnInit {
  #element: ElementRef<SbbPaginatorElement> = inject(ElementRef<SbbPaginatorElement>);
  #ngZone: NgZone = inject(NgZone);
  #initialized = new AsyncSubject<void>();

  readonly initialized: Observable<void> = forkJoin([
    this.#element.nativeElement.updateComplete,
    this.#initialized,
  ]).pipe(map(() => undefined));

  @Input()
  public set pageSizeOptions(value: number[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSizeOptions = value));
  }
  public get pageSizeOptions(): number[] {
    return this.#element.nativeElement.pageSizeOptions;
  }

  @Input()
  public set pagerPosition(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pagerPosition = value));
  }
  public get pagerPosition(): 'start' | 'end' {
    return this.#element.nativeElement.pagerPosition;
  }

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

  /** Calculate the number of pages */
  numberOfPages(): number {
    return this.#element.nativeElement.numberOfPages();
  }

  ngOnInit(): void {
    this.#initialized.next();
    this.#initialized.complete();
  }
}
