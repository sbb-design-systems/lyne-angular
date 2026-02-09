import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbImageElement } from '@sbb-esta/lyne-elements/image.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/image.js';

/**
 * It displays an image.
 * @cssprop [--sbb-image-aspect-ratio=auto] - Can be used to override `aspectRatio` property. This way we can have, for example, an image component with an aspect ratio of 4/3 in smaller viewports and 16/9 in larger viewports.
 * @cssprop [--sbb-image-object-position=undefined] - Can be used to set the object-position CSS property of the image itself if the image itself is cropped.
 * @cssprop [--sbb-image-object-fit=cover] - Can be used to set the object-fit CSS property of the image itself if the image itself is cropped.
 */
@Directive({
  selector: 'sbb-image',
  exportAs: 'sbbImage',
})
export class SbbImage {
  #element: ElementRef<SbbImageElement> = inject(ElementRef<SbbImageElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * An alt text is not always necessary (e.g. in teaser cards when
   * additional link text is provided). In this case we can leave
   * the value of the alt attribute blank, but the attribute itself
   * still needs to be present. That way we can signal assistive
   * technology, that they can skip the image.
   */
  @Input()
  public set alt(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alt = value));
  }
  public get alt(): string {
    return this.#element.nativeElement.alt;
  }

  /**
   * If set to false, we show a blurred version of the image as
   * placeholder before the actual image shows up. This will help
   * to improve the perceived loading performance. Read more about
   * the idea of lqip here:
   * https://medium.com/@imgix/lqip-your-images-for-fast-loading-2523d9ee4a62
   */
  @Input({ transform: booleanAttribute })
  public set skipLqip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.skipLqip = value));
  }
  public get skipLqip(): boolean {
    return this.#element.nativeElement.skipLqip;
  }

  /**
   * Set this to true, if you want to pass a custom focal point
   * for the image. See full documentation here:
   * https://docs.imgix.com/apis/rendering/focalpoint-crop
   */
  @Input({ transform: booleanAttribute })
  public set customFocalPoint(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.customFocalPoint = value));
  }
  public get customFocalPoint(): boolean {
    return this.#element.nativeElement.customFocalPoint;
  }

  /**
   * If the lazy property is set to true, the module will automatically
   * change the decoding to async, otherwise the decoding is set to auto
   * which leaves the handling up to the browser. Read more about the
   * decoding attribute here:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
   */
  @Input()
  public set decoding(value: 'sync' | 'async' | 'auto') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.decoding = value));
  }
  public get decoding(): 'sync' | 'async' | 'auto' {
    return this.#element.nativeElement.decoding;
  }

  /**
   * Set this to true, to receive visual guidance where the custom focal
   * point is currently set.
   */
  @Input({ transform: booleanAttribute })
  public set focalPointDebug(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointDebug = value));
  }
  public get focalPointDebug(): boolean {
    return this.#element.nativeElement.focalPointDebug;
  }

  /**
   * Pass in a floating number between 0 (left) and 1 (right).
   */
  @Input({ transform: numberAttribute })
  public set focalPointX(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointX = value));
  }
  public get focalPointX(): number {
    return this.#element.nativeElement.focalPointX;
  }

  /**
   * Pass in a floating number between 0 (top) and 1 (bottom).
   */
  @Input({ transform: numberAttribute })
  public set focalPointY(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointY = value));
  }
  public get focalPointY(): number {
    return this.#element.nativeElement.focalPointY;
  }

  /**
   * Right now the module is heavily coupled with the image delivery
   * service imgix and depends on the original files being stored
   * inside AEM. You can pass in any https://cdn.img.sbb.ch img
   * src address you find on sbb.ch to play around with it. Just
   * strip the url parameters and paste in the plain file address.
   * If you want to know how to best work with this module with
   * images coming from a different source, please contact the
   * LYNE Core Team.
   */
  @Input()
  public set imageSrc(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageSrc = value));
  }
  public get imageSrc(): string {
    return this.#element.nativeElement.imageSrc;
  }

  /**
   * The importance attribute is fairly new attribute which should
   * help the browser decide which resources it should prioritise
   * during page load. We will set the attribute value based on the
   * value, we receive in the loading attribute. 'eager', which we use
   * for the largest image within the initial viewport, will set the
   * attribute value to 'high'. 'lazy', which we use for images below
   * the fold, will set the attribute value to 'low'.
   */
  @Input()
  public set importance(value: 'auto' | 'high' | 'low') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.importance = value));
  }
  public get importance(): 'auto' | 'high' | 'low' {
    return this.#element.nativeElement.importance;
  }

  /**
   * With the support of native image lazy loading, we can now
   * decide whether we want to load the image immediately or only
   * once it is close to the visible viewport. The value eager is
   * best used for images within the initial viewport. We want to
   * load these images as fast as possible to improve the Core Web
   * Vitals values. lazy on the other hand works best for images
   * which are further down the page or invisible during the loading
   * of the initial viewport.
   */
  @Input()
  public set loading(value: 'eager' | 'lazy') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loading = value));
  }
  public get loading(): 'eager' | 'lazy' {
    return this.#element.nativeElement.loading;
  }

  /**
   * With `performance.mark` you can log a timestamp associated with
   * the name you define in performanceMark when a certain event is
   * happening. In our case we will log the `performance.mark` into
   * the PerformanceEntry API once the image is fully loaded.
   * Performance monitoring tools like SpeedCurve or Lighthouse are
   * then able to grab these entries from the PerformanceEntry API
   * and give us additional information and insights about our page
   * loading behaviour. We are then also able to monitor these
   * values over a long period to see if our performance
   * increases or decreases over time. Best to use lowercase strings
   * here, separate words with underscores or dashes.
   */
  @Input()
  public set performanceMark(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.performanceMark = value));
  }
  public get performanceMark(): string {
    return this.#element.nativeElement.performanceMark;
  }

  /**
   * With the pictureSizesConfig object, you can pass in information
   * into image about what kind of source elements should get
   * rendered. mediaQueries accepts multiple Media Query entries
   * which can get combined by defining a conditionOperator.
   * Type is: stringified InterfaceImageAttributesSizesConfig-Object
   * An example could look like this:
   * {
   *    "breakpoints": [
   *      {
   *        "image": {
   *          "height": "675",
   *          "width": "1200"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "min-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "sbb-breakpoint-large-min"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      },
   *      {
   *        "image": {
   *          "height": "549",
   *          "width": "976"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "min-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "sbb-breakpoint-small-min"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      },
   *      {
   *        "image": {
   *          "height": "180",
   *          "width": "320"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "max-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "sbb-breakpoint-small-max"
   *            },
   *            "conditionOperator": "and"
   *          },
   *          {
   *            "conditionFeature": "orientation",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": false,
   *              "value": "landscape"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      }
   *    ]
   *  }
   */
  @Input()
  public set pictureSizesConfig(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pictureSizesConfig = value));
  }
  public get pictureSizesConfig(): string {
    return this.#element.nativeElement.pictureSizesConfig;
  }

  /**
   * Whether the image is finished loading or failed to load.
   */
  public get complete(): boolean {
    return this.#element.nativeElement.complete;
  }

  protected _loadOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'load' });
  /**
   * Emits each time an image loads. E.g. loading image for a different viewport, triggers the load event again.
   */
  public loadOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'load'),
  );

  protected _errorOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'error' });
  /**
   * Emits when the image loading ended in an error.
   */
  public errorOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'error'),
  );
}
