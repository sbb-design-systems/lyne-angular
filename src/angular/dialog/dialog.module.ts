import { SbbDialog } from './dialog/dialog';
import { SbbDialogActions } from './dialog-actions/dialog-actions';
import { SbbDialogCloseButton } from './dialog-close-button/dialog-close-button';
import { SbbDialogContent } from './dialog-content/dialog-content';
import { SbbDialogTitle } from './dialog-title/dialog-title';

export const SbbDialogModule = [
  SbbDialog,
  SbbDialogActions,
  SbbDialogCloseButton,
  SbbDialogContent,
  SbbDialogTitle,
] as const;
