import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbDownloadInfoElement } from '@sbb-esta/lyne-elements/download.pure.js';

/**
 * It displays metadata of a document; used within a `sbb-download`.
 */
@Directive({
  selector: 'sbb-download-info',
  exportAs: 'sbbDownloadInfo',
})
export class SbbDownloadInfo {
  static {
    SbbDownloadInfoElement.define();
  }

  #element: ElementRef<SbbDownloadInfoElement> = inject(ElementRef<SbbDownloadInfoElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The type of the document (e.g. `PDF`). Falls back to the extension of the
   * parent `sbb-download`.
   */
  @Input()
  public set type(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): string {
    return this.#element.nativeElement.type;
  }

  /**
   * The size of the document. If the value contains non-numeric characters it
   * is rendered as is, otherwise it is interpreted as a number of bytes and
   * shortened to the closest unit.
   */
  @Input()
  public set size(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): string {
    return this.#element.nativeElement.size;
  }

  /**
   * The date of the latest change of the document, as an ISO 8601 string.
   */
  @Input()
  public set changed(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.changed = value));
  }
  public get changed(): string {
    return this.#element.nativeElement.changed;
  }

  /**
   * Whether the document is not accessible.
   */
  @Input({ transform: booleanAttribute })
  public set nonAccessible(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.nonAccessible = value));
  }
  public get nonAccessible(): boolean {
    return this.#element.nativeElement.nonAccessible;
  }
}
