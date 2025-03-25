import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbDialog } from '@sbb-esta/lyne-angular/dialog/dialog';
import { SbbDialogActions } from '@sbb-esta/lyne-angular/dialog/dialog-actions';
import { SbbDialogContent } from '@sbb-esta/lyne-angular/dialog/dialog-content';
import { SbbDialogTitle } from '@sbb-esta/lyne-angular/dialog/dialog-title';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import type { SbbDialogElement } from '@sbb-esta/lyne-elements/dialog/dialog.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const openDialog = (_event: PointerEvent, id: string): void => {
  const dialog = document.getElementById(id) as SbbDialogElement;
  dialog.open();
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Title',
  },
};

const backButton: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Title',
  },
};

const hideOnScroll: InputType = {
  control: {
    type: 'select',
  },
  options: ['Deactivate hide on scroll', ...breakpoints],
  table: {
    category: 'Title',
  },
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Title',
  },
};

const accessibilityBackLabel: InputType = {
  control: {
    type: 'text',
  },
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
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  backdrop,
  'backdrop-action': backdropAction,
};

const args: Args = {
  level: level.options![1],
  backButton: true,
  hideOnScroll: hideOnScroll.options![0],
  accessibilityCloseLabel: 'Close dialog',
  accessibilityBackLabel: 'Go back',
  backdrop: 'opaque',
  'backdrop-action': backdropAction.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [
        SbbDialogTitle,
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
  argTypes: {
    ...argTypes,
    openDialog: { type: 'function', control: false, table: { disable: true } },
  },
  args: {
    ...args,
    openDialog: (e: PointerEvent, id: string) => openDialog(e, id),
  },
  render: ({
    level,
    backButton,
    hideOnScroll,
    accessibilityCloseLabel,
    accessibilityBackLabel,
    ...args
  }: Args) => ({
    props: {
      level,
      backButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
      ...args,
    },
    template: `
      <sbb-button
        aria-haspopup="dialog"
        aria-controls="my-dialog-1"
        size="m"
        type="button"
        (click)="openDialog($event, 'my-dialog-1')"
      >
        Open dialog
      </sbb-button>
      <sbb-dialog id="my-dialog-1" ${argsToTemplate(args)}>
        <sbb-dialog-title
          level=${level}
          ${backButton ? 'back-button' : ''}
          ${hideOnScroll === 'Deactivate hide on scroll' ? '' : `hide-on-scroll=${hideOnScroll}`}
          accessibility-close-label=${accessibilityCloseLabel}
          accessibility-back-label=${accessibilityBackLabel}
          >A describing title of the dialog</sbb-dialog-title
        >
        <sbb-dialog-content>
          <p
            id="dialog-content-1"
            style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x); margin: 0;"
          >
            Dialog content
          </p>
        </sbb-dialog-content>
        <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="medium">
          <sbb-block-link
            align-self="start"
            icon-name="chevron-small-left-small"
            href="https://www.sbb.ch/en/"
            [negative]=${args['negative']}
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
