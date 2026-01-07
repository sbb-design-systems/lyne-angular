import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbDialog } from './dialog/dialog';
import { SbbDialogContainer } from './dialog/dialog-container';
import { SbbDialogActions } from './dialog-actions/dialog-actions';
import { SbbDialogClose } from './dialog-close/dialog-close';
import { SbbDialogCloseButton } from './dialog-close-button/dialog-close-button';
import { SbbDialogContent } from './dialog-content/dialog-content';
import { SbbDialogTitle } from './dialog-title/dialog-title';

const SBB_DIALOG_EXPORTED_DECLARATIONS = [
  SbbDialog,
  SbbDialogActions,
  SbbDialogCloseButton,
  SbbDialogClose,
  SbbDialogContent,
  SbbDialogTitle,
  SbbDialogContainer,
  SbbFocusInitial,
];

@NgModule({
  imports: SBB_DIALOG_EXPORTED_DECLARATIONS,
  exports: SBB_DIALOG_EXPORTED_DECLARATIONS,
})
export class SbbDialogModule {}
