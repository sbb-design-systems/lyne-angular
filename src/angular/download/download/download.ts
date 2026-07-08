import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbDownloadElement } from '@sbb-esta/lyne-elements/download.pure.js';

/**
 * It displays a downloadable document, styled as a card.
 * Inherits link properties from `SbbLinkBaseElement`: `href`, `target`, `rel`
 * and `accessibilityLabel`. The download behavior is always enabled.
 *
 * @slot  - Use the unnamed slot to add custom content. Optional.
 * @slot info - Slot used to render a `sbb-download-info`. A `sbb-download-info` placed in the unnamed slot is automatically moved to this slot. Optional.
 * @slot icon - Use this slot to display a custom icon, by providing a `sbb-icon` component. Optional.
 */
@Directive({
  selector: 'sbb-download',
  exportAs: 'sbbDownload',
})
export class SbbDownload {
  static {
    SbbDownloadElement.define();
  }

  #element: ElementRef<SbbDownloadElement> = inject(ElementRef<SbbDownloadElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Option to set the component's background color.
   */
  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  /**
   * The label of the download. Defaults to the file name of the `href`.
   */
  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }

  /**
   * The download behavior is always enabled and handled internally, therefore
   * this property cannot be disabled and is not reflected to the host element.
   */
  @Input({ transform: booleanAttribute })
  public set download(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): boolean {
    return this.#element.nativeElement.download;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  /**
   * The href value you want to link to.
   */
  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  /**
   * Where to display the linked URL.
   */
  @Input()
  public set target(value: '_blank' | '_self' | '_parent' | '_top' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): '_blank' | '_self' | '_parent' | '_top' | string {
    return this.#element.nativeElement.target;
  }

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  /**
   * This will be forwarded as aria-label to the inner anchor element.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * This will be forwarded as aria-current to the inner anchor element.
   */
  @Input()
  public set accessibilityCurrent(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCurrent = value),
    );
  }
  public get accessibilityCurrent(): string {
    return this.#element.nativeElement.accessibilityCurrent;
  }

  /**
   * The file name extracted from the `href` (e.g. `report.pdf`).
   */
  public get fileName(): string {
    return this.#element.nativeElement.fileName;
  }

  /**
   * The lower-cased file extension extracted from the `href` (e.g. `pdf`), if any.
   */
  public get fileExtension(): string {
    return this.#element.nativeElement.fileExtension;
  }
}
