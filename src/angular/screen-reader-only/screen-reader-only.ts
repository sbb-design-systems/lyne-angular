import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/screen-reader-only.js';

/**
 * This component can be used to visually hide content but present it to screen readers.
 *
 * @slot  - Use the unnamed slot to provide content.
 */
@Directive({
  selector: 'sbb-screen-reader-only',
  exportAs: 'sbbScreenReaderOnly',
})
export class SbbScreenReaderOnly {}
