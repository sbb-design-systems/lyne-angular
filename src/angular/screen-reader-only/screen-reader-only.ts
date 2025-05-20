import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/screen-reader-only.js';

@Directive({
  selector: 'sbb-screen-reader-only',
  exportAs: 'sbbScreenReaderOnly',
})
export class SbbScreenReaderOnly {}
