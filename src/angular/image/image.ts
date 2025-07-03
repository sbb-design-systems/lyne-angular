import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbImageElement } from '@sbb-esta/lyne-elements/image.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/image.js';

@Directive({
  selector: 'sbb-image',
  exportAs: 'sbbImage',
})
export class SbbImage {
  #element: ElementRef<SbbImageElement> = inject(ElementRef<SbbImageElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set alt(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alt = value));
  }
  public get alt(): string {
    return this.#element.nativeElement.alt;
  }

  @Input({ transform: booleanAttribute })
  public set skipLqip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.skipLqip = value));
  }
  public get skipLqip(): boolean {
    return this.#element.nativeElement.skipLqip;
  }

  @Input({ transform: booleanAttribute })
  public set customFocalPoint(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.customFocalPoint = value));
  }
  public get customFocalPoint(): boolean {
    return this.#element.nativeElement.customFocalPoint;
  }

  @Input()
  public set decoding(value: 'sync' | 'async' | 'auto') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.decoding = value));
  }
  public get decoding(): 'sync' | 'async' | 'auto' {
    return this.#element.nativeElement.decoding;
  }

  @Input({ transform: booleanAttribute })
  public set focalPointDebug(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointDebug = value));
  }
  public get focalPointDebug(): boolean {
    return this.#element.nativeElement.focalPointDebug;
  }

  @Input({ transform: numberAttribute })
  public set focalPointX(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointX = value));
  }
  public get focalPointX(): number {
    return this.#element.nativeElement.focalPointX;
  }

  @Input({ transform: numberAttribute })
  public set focalPointY(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointY = value));
  }
  public get focalPointY(): number {
    return this.#element.nativeElement.focalPointY;
  }

  @Input()
  public set imageSrc(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageSrc = value));
  }
  public get imageSrc(): string {
    return this.#element.nativeElement.imageSrc;
  }

  @Input()
  public set importance(value: 'auto' | 'high' | 'low') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.importance = value));
  }
  public get importance(): 'auto' | 'high' | 'low' {
    return this.#element.nativeElement.importance;
  }

  @Input()
  public set loading(value: 'eager' | 'lazy') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loading = value));
  }
  public get loading(): 'eager' | 'lazy' {
    return this.#element.nativeElement.loading;
  }

  @Input()
  public set performanceMark(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.performanceMark = value));
  }
  public get performanceMark(): string {
    return this.#element.nativeElement.performanceMark;
  }

  @Input()
  public set pictureSizesConfig(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pictureSizesConfig = value));
  }
  public get pictureSizesConfig(): string {
    return this.#element.nativeElement.pictureSizesConfig;
  }

  public get complete(): boolean {
    return this.#element.nativeElement.complete;
  }

  protected _loadSignal = outputFromObservable<Event>(NEVER, { alias: 'load' });
  public loadSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'load'));

  protected _errorSignal = outputFromObservable<Event>(NEVER, { alias: 'error' });
  public errorSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'error'));
}
