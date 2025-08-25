import { NgModule } from '@angular/core';

import { SbbDialog } from './dialog/dialog';
import { SbbDialogActions } from './dialog-actions/dialog-actions';
import { SbbDialogCloseButton } from './dialog-close-button/dialog-close-button';
import { SbbDialogContent } from './dialog-content/dialog-content';
import { SbbDialogTitle } from './dialog-title/dialog-title';

const EXPORTED_DECLARATIONS = [
  SbbDialog,
  SbbDialogActions,
  SbbDialogCloseButton,
  SbbDialogContent,
  SbbDialogTitle,
];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbDialogModule {}
