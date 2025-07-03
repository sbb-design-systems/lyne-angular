import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/message.js';

@Directive({
  selector: 'sbb-message',
  exportAs: 'sbbMessage',
})
export class SbbMessage {}
