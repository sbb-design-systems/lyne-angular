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
import { fromEvent, NEVER, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/toast.js';

@Directive({
  selector: 'sbb-toast',
  exportAs: 'sbbToast',
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
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

  @Input()
  public set politeness(value: 'polite' | 'assertive' | 'off') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.politeness = value));
  }
  public get politeness(): 'polite' | 'assertive' | 'off' {
    return this.#element.nativeElement.politeness;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willOpen',
  );

  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didOpen',
  );

  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willClose',
  );

  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didClose',
  );

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
