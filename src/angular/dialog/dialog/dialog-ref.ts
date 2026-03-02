import { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core/overlay';
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog/dialog.js';

// TODO: The default type for R should be `unknown`, but it is set to `any` for backward compatibility reasons. It can be changed to `unknown` in the next major release.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SbbDialogRef<T = unknown, R = any> extends SbbOverlayBaseRef<
  T,
  SbbDialogCloseEvent<R>
> {}
