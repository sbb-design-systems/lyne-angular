/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbPaginatorElement } from '@sbb-esta/lyne-elements/paginator/paginator.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/paginator/paginator.js';

@Directive({
  selector: 'sbb-paginator',
  standalone: true,
})
export class SbbPaginatorDirective {
  #element: ElementRef<SbbPaginatorElement> = inject(ElementRef<SbbPaginatorElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'page-size-options' })
  public set pageSizeOptions(value: number[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSizeOptions = value));
  }
  public get pageSizeOptions(): number[] {
    return this.#element.nativeElement.pageSizeOptions;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'pager-position' })
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

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'page-size', transform: numberAttribute })
  public set pageSize(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSize = value));
  }
  public get pageSize(): number {
    return this.#element.nativeElement.pageSize;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'page-index', transform: numberAttribute })
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

  @Output() public page: Observable<SbbPaginatorPageEventDetails> =
    fromEvent<SbbPaginatorPageEventDetails>(this.#element.nativeElement, 'page');
}
