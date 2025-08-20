import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbDialog } from '@sbb-esta/lyne-angular/dialog/dialog';
import { SbbDialogActions } from '@sbb-esta/lyne-angular/dialog/dialog-actions';
import { SbbDialogCloseButton } from '@sbb-esta/lyne-angular/dialog/dialog-close-button';
import { SbbDialogContent } from '@sbb-esta/lyne-angular/dialog/dialog-content';
import { SbbDialogTitle } from '@sbb-esta/lyne-angular/dialog/dialog-title';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Title',
  },
};

const backdrop: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['opaque', 'translucent'],
};

const backdropAction: InputType = {
  control: {
    type: 'select',
  },
  options: ['close', 'none'],
};

const argTypes: ArgTypes = {
  level,
  backdrop,
  backdropAction,
};

const args: Args = {
  level: level.options![1],
  backdrop: 'opaque',
  backdropAction: backdropAction.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [
        SbbDialogTitle,
        SbbDialogCloseButton,
        SbbDialogContent,
        SbbDialogActions,
        SbbButton,
        SbbSecondaryButton,
        SbbBlockLink,
      ],
    }),
  ],
  title: 'elements/sbb-dialog/sbb-dialog',
  component: SbbDialog,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({
    level,
    backButton,
    hideOnScroll,
    accessibilityCloseLabel,
    accessibilityBackLabel,
    negative,
    ...args
  }: Args) => ({
    props: {
      level,
      backButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
      negative,
      ...args,
    },
    template: `
      <sbb-button size="m" #trigger>
        Open dialog
      </sbb-button>
      <sbb-dialog [trigger]="trigger" ${argsToTemplate(args)} [negative]='negative'>
        <sbb-dialog-title level=${level}>
          A describing title of the dialog
        </sbb-dialog-title>
        <sbb-dialog-close-button></sbb-dialog-close-button>
        <sbb-dialog-content>
          <p
            id="dialog-content-1"
            style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x); margin: 0;"
          >
            Dialog content
          </p>
        </sbb-dialog-content>
        <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontalFrom="medium">
          <sbb-block-link
            align-self="start"
            icon-name="chevron-small-left-small"
            href="https://www.sbb.ch/en/"
            [negative]='negative'
            sbb-dialog-close
          >
            Link
          </sbb-block-link>
          <sbb-secondary-button sbb-dialog-close> Cancel </sbb-secondary-button>
          <sbb-button sbb-dialog-close> Confirm </sbb-button>
        </sbb-dialog-actions>
      </sbb-dialog>
    `,
  }),
};
export default meta;

export const Default = {};
