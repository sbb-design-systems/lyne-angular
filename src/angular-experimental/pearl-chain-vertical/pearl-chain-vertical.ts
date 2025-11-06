import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical.js';

/**
 * It can be used as a container for the `sbb-pearl-chain-vertical-item` component.
 *
 * @slot  - The unnamed slot is used for the `sbb-pearl-chain-vertical-item` component.
 */
@Directive({
  selector: 'sbb-pearl-chain-vertical',
  exportAs: 'sbbPearlChainVertical',
})
export class SbbPearlChainVertical {}
