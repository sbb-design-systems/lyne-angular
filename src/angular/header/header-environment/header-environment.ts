import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/header/header-environment.js';

/**
 * It displays a ribbon inside the header to indicate the current environment.
 *
 * @slot  - Use the unnamed slot to add the environment.
 * @cssprop [--sbb-header-environment-background-color=var(sbb-color-granite)] - Can be used change the ribbon color.
 * @cssprop [--sbb-header-environment-color=var(sbb-color-white)] - Can be used change the text color.
 */
@Directive({
  selector: 'sbb-header-environment',
  exportAs: 'sbbHeaderEnvironment',
})
export class SbbHeaderEnvironment {}
