/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/screen-reader-only.js';

@Directive({
  selector: 'sbb-screen-reader-only',
  standalone: true,
})
export class SbbScreenReaderOnly {}
