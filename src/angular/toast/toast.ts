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
import type { SbbToastElement, SbbToastPosition } from '@sbb-esta/lyne-elements/toast.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/toast.js';

@Directive({
  selector: 'sbb-toast',
})
export class SbbToast {
  #element: ElementRef<SbbToastElement> = inject(ElementRef<SbbToastElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: numberAttribute })
  public set timeout(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.timeout = value));
  }
  public get timeout(): number {
    return this.#element.nativeElement.timeout;
  }

  @Input()
  public set position(value: SbbToastPosition) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): SbbToastPosition {
    return this.#element.nativeElement.position;
  }

  @Input({ transform: booleanAttribute })
  public set dismissible(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dismissible = value));
  }
  public get dismissible(): boolean {
    return this.#element.nativeElement.dismissible;
  }

  @Input()
  public set politeness(value: 'polite' | 'assertive' | 'off') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.politeness = value));
  }
  public get politeness(): 'polite' | 'assertive' | 'off' {
    return this.#element.nativeElement.politeness;
  }

  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willClose');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didClose');

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
