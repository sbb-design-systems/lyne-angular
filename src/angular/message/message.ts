import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/message.js';

/**
 * It displays a complex message combining a title, an image, an action and some content.
 *
 * @slot image - Use this slot to provide an `sbb-image` component.
 * @slot title - Use this slot to provide an `sbb-title`.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide an `sbb-secondary-button`.
 */
@Directive({
  selector: 'sbb-message',
  exportAs: 'sbbMessage',
})
export class SbbMessage {}
